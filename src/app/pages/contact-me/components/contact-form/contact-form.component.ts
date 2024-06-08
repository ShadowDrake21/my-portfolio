import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { SocialsComponent } from '@shared/components/socials/socials.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { from, merge, Observable, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactMeSnackbarComponent } from '../contact-me-snackbar/contact-me-snackbar.component';
import { ThemeModeType } from '@shared/models/types.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  providers: [TranslateService],
})
export class ContactFormComponent implements OnInit {
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;

  private _snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

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

    const currentLang = this.translate.currentLang;

    const submitSubscription = from(
      emailjs.send('service_ona0hct', 'template_b3srzms', {
        from_name: name,
        to_name: 'Demetriusz',
        from_email: email,
        message: message,
      })
    ).subscribe({
      next: () => {
        this.openSnackBar(
          currentLang === 'en'
            ? 'Message successfully sent!'
            : currentLang === 'pl'
            ? 'Wiadomość pomyślnie wysłana!'
            : 'Повідомлення успішно відправлено!'
        );
        this.contactForm.reset();
      },
      error: (error) =>
        this.openSnackBar(
          (currentLang === 'en'
            ? 'Error during message sending: '
            : currentLang === 'pl'
            ? 'Wystąpił błąd podczas wysyłania wiadomości: '
            : 'Помилка під час відправлення повідомлення: ') +
            ` ${(error as EmailJSResponseStatus).text}`
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
    const currentLang = this.translate.currentLang;

    if (controlErrors?.['required']) {
      this[`${control}ErrorMessage`] =
        currentLang === 'en'
          ? 'You must enter a value'
          : currentLang === 'pl'
          ? 'Musi Państwo wprowadzić znaczenie'
          : 'Ви повинні ввести значення';
    } else if (controlErrors?.['minlength']) {
      this[`${control}ErrorMessage`] =
        currentLang === 'en'
          ? 'String is too short'
          : currentLang === 'pl'
          ? 'Wiersz jest bardzo krótki'
          : 'Значення є дуже коротке';
    } else if (controlErrors?.['maxlength']) {
      this[`${control}ErrorMessage`] =
        currentLang === 'en'
          ? 'String is too long'
          : currentLang === 'pl'
          ? 'Wiersz jest bardzo długi'
          : 'Значення є дуже довге';
    } else if (control === 'email' && controlErrors?.['email']) {
      this.emailErrorMessage =
        currentLang === 'en'
          ? 'Not a valid e-mail'
          : currentLang === 'pl'
          ? 'To nie jest ważny e-mail'
          : 'Недійсна електронна адреса';
    } else {
      this[`${control}ErrorMessage`] = '';
    }
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(ContactMeSnackbarComponent, {
      data: message,
      duration: this.snackBarDurationInSeconds * 1000,
    });
  }
}
