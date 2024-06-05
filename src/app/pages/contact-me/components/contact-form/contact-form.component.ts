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
    merge(
      this.contactForm.controls.email.statusChanges,
      this.contactForm.controls.email.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateNameErrorMessage());

    merge(
      this.contactForm.controls.email.statusChanges,
      this.contactForm.controls.email.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(
      this.contactForm.controls.message.statusChanges,
      this.contactForm.controls.message.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTextareaErrorMessage());
  }

  ngOnInit(): void {}

  onFormSubmit() {
    emailjs.init('IGAxW1H-zizWj4l1c');

    const submitSubscription = from(
      emailjs.send('service_ona0hct', 'template_b3srzms', {
        from_name: this.contactForm.value.name,
        to_name: 'Demetriusz',
        from_email: this.contactForm.value.email,
        message: this.contactForm.value.message,
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

  updateNameErrorMessage() {
    if (this.contactForm.controls.name.hasError('required')) {
      this.nameErrorMessage = 'You must enter a value';
    } else if (this.contactForm.controls.name.hasError('minlength')) {
      this.nameErrorMessage = 'Name is too short';
    } else if (this.contactForm.controls.name.hasError('maxlength')) {
      this.nameErrorMessage = 'Name is too long';
    } else {
      this.nameErrorMessage = '';
    }
  }

  updateEmailErrorMessage() {
    if (this.contactForm.controls.email.hasError('required')) {
      this.emailErrorMessage = 'You must enter a value';
    } else if (this.contactForm.controls.email.hasError('email')) {
      this.emailErrorMessage = 'Not a valid email';
    } else {
      this.emailErrorMessage = '';
    }
  }

  updateTextareaErrorMessage() {
    if (this.contactForm.controls.message.hasError('required')) {
      this.messageErrorMessage = 'You must enter a value';
    } else if (this.contactForm.controls.message.hasError('minlength')) {
      this.messageErrorMessage = 'Message is too short';
    } else if (this.contactForm.controls.message.hasError('maxlength')) {
      this.messageErrorMessage = 'Message is too long';
    } else {
      this.messageErrorMessage = '';
    }
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(ContactMeSnackbarComponent, {
      data: message,
      duration: this.snackBarDurationInSeconds * 1000,
    });
  }
}
