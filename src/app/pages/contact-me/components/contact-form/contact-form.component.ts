// angular stuff
import { Component, inject, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';

// components
import { ContactMeSnackbarComponent } from '../contact-me-snackbar/contact-me-snackbar.component';
import { SocialsComponent } from '@shared/components/socials/socials.component';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';
import { ContactMeService } from '@core/services/contactMe.service';
import { environment } from 'src/environments/environment.development';
import { ContactFormData } from '@shared/models/contact-me.model';
import { ThemeClassPipe } from '@shared/pipes/theme-class.pipe';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';

type TRANSLATE_MESSAGE_TYPES =
  | 'SUCCESS_MESSAGE'
  | 'ERROR_PREFIX'
  | 'REQUIRED_ERROR'
  | 'MIN_LENGTH_ERROR'
  | 'MAX_LENGTH_ERROR'
  | 'EMAIL_ERROR';

@Component({
  selector: 'app-contact-form',
  imports: [
    SocialsComponent,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
    ThemeClassDirective,
    AsyncPipe,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  providers: [TranslateService],
})
export class ContactFormComponent {
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;

  private readonly _snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);
  private readonly contactMeService = inject(ContactMeService);

  private snackBarDurationInSeconds = 5;
  private subscriptions: Subscription[] = [];

  contactForm = this.contactMeService.contactMeForm;

  errorMessages = {
    name: '',
    email: '',
    message: '',
  };

  constructor() {
    this.setupFormErrorHandlers();
    emailjs.init(environment.emailjs.publicKey);
  }

  onFormSubmit() {
    if (this.contactForm.invalid) return;

    const formData = this.getFormData();
    emailjs
      .send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        formData
      )
      .then(
        () => this.handleSubmitSuccess(),
        (error: EmailJSResponseStatus) => this.handleSubmitError(error)
      );
  }

  private getFormData(): ContactFormData {
    return {
      from_name: this.contactForm.value.name || '',
      to_name: 'Demetriusz',
      from_email: this.contactForm.value.email || '',
      message: this.contactForm.value.message || '',
    };
  }

  private handleSubmitSuccess(): void {
    const message = this.getTranslatedMessage('SUCCESS_MESSAGE');
    this.showSnackBar(message);
    this.contactForm.reset();
  }

  private handleSubmitError(error: EmailJSResponseStatus): void {
    const prefix = this.getTranslatedMessage('ERROR_PREFIX');
    const message = `${prefix}: ${error.text}`;
    this.showSnackBar(message);
  }

  private setupFormErrorHandlers(): void {
    (['name', 'email', 'message'] as const).forEach((control) => {
      this.contactForm
        .get(control)
        ?.valueChanges.pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage(control));
    });
  }

  public updateErrorMessage(control: 'name' | 'email' | 'message'): void {
    const errors = this.contactForm.get(control)?.errors;
    if (!errors) {
      this.errorMessages[control] = '';
      return;
    }

    if (errors['required']) {
      this.errorMessages[control] = this.getTranslatedMessage('REQUIRED_ERROR');
    } else if (errors['minlength']) {
      this.errorMessages[control] =
        this.getTranslatedMessage('MIN_LENGTH_ERROR');
    } else if (errors['maxlength']) {
      this.errorMessages[control] =
        this.getTranslatedMessage('MAX_LENGTH_ERROR');
    } else if (control === 'email' && errors['email']) {
      this.errorMessages[control] = this.getTranslatedMessage('EMAIL_ERROR');
    }
  }

  private getTranslatedMessage(key: TRANSLATE_MESSAGE_TYPES): string {
    const translations = {
      SUCCESS_MESSAGE: {
        en: 'Message successfully sent!',
        pl: 'Wiadomość pomyślnie wysłana!',
        ua: 'Повідомлення успішно відправлено!',
      },
      ERROR_PREFIX: {
        en: 'Error during message sending',
        pl: 'Wystąpił błąd podczas wysyłania wiadomości',
        ua: 'Помилка під час відправлення повідомлення',
      },
      REQUIRED_ERROR: {
        en: 'You must enter a value',
        pl: 'Musi Państwo wprowadzić znaczenie',
        ua: 'Ви повинні ввести значення',
      },
      MIN_LENGTH_ERROR: {
        en: 'String is too short',
        pl: 'Wiersz jest bardzo krótki',
        ua: 'Значення є дуже коротке',
      },
      MAX_LENGTH_ERROR: {
        en: 'String is too long',
        pl: 'Wiersz jest bardzo długi',
        ua: 'Значення є дуже довге',
      },
      EMAIL_ERROR: {
        en: 'Not a valid e-mail',
        pl: 'To nie jest ważny e-mail',
        ua: 'Недійсна електронна адреса',
      },
    };
    const currentLang = this.translate.currentLang as 'en' | 'pl' | 'ua';
    return translations[key][currentLang];
  }

  private showSnackBar(message: string): void {
    this._snackBar.openFromComponent(ContactMeSnackbarComponent, {
      data: message,
      duration: this.snackBarDurationInSeconds * 1000,
    });
  }
}
