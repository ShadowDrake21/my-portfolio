import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SocialsComponent } from '@shared/components/socials/socials.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { from, merge, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactMeSnackbarComponent } from '../contact-me-snackbar/contact-me-snackbar.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    SocialsComponent,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ContactMeSnackbarComponent,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  private snackBarDurationInSeconds = 5;

  nameErrorMessage!: string;
  emailErrorMessage!: string;
  messageErrorMessage!: string;

  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(500),
    ]),
  });

  private subscriptions: Subscription[] = [];

  constructor() {
    this.setupErrorMessageHandlers();
  }

  ngOnInit(): void {}

  onFormSubmit() {
    emailjs.init('IGAxW1H-zizWj4l1c');

    const { name, email, message } = this.contactForm.value;

    const submitSubscription = from(
      emailjs.send('service_ona0hct', 'template_b3srzms', {
        from_name: name,
        to_name: 'Demetriusz',
        from_email: email,
        message: message,
      })
    ).subscribe({
      next: () => {
        this.openSnackBar('Message successfully send!');
        this.contactForm.reset();
      },
      error: (error) =>
        this.openSnackBar(
          `Error during message sending: ${
            (error as EmailJSResponseStatus).text
          }`
        ),
    });

    this.subscriptions.push(submitSubscription);
  }

  private setupErrorMessageHandlers() {
    const controls = ['name', 'email', 'message'] as const;

    controls.forEach((control) => {
      merge(
        this.contactForm.controls[control].statusChanges,
        this.contactForm.controls[control].valueChanges
      )
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage(control));
    });
  }

  updateErrorMessage(control: 'name' | 'email' | 'message') {
    const controlErrors = this.contactForm.controls[control].errors;

    if (controlErrors?.['required']) {
      this[`${control}ErrorMessage`] = 'You must enter a value';
    } else if (controlErrors?.['minlength']) {
      this[`${control}ErrorMessage`] = `${this.capitalizeFirstLetter(
        control
      )} is too short`;
    } else if (controlErrors?.['maxlength']) {
      this[`${control}ErrorMessage`] = `${this.capitalizeFirstLetter(
        control
      )} is too long`;
    } else if (control === 'email' && controlErrors?.['email']) {
      this.emailErrorMessage = 'Not a valid email';
    } else {
      this[`${control}ErrorMessage`] = '';
    }
  }

  private capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(ContactMeSnackbarComponent, {
      data: message,
      duration: this.snackBarDurationInSeconds * 1000,
    });
  }
}
