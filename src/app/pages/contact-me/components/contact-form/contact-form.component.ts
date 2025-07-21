// angular stuff
import { Component, inject, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
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
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';
import { translationMessages } from './content/translate-messages.content';
import {
  ContactFormControl,
  LanguageOptionsType,
  TRANSLATE_MESSAGE_TYPES,
} from './types/contact-form.types';

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
    this.sendEmail(this.getFormData());
  }

  private sendEmail(formData: ContactFormData): void {
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
      this.trackControlChanges(control);
    });
  }

  private trackControlChanges(control: ContactFormControl): void {
    this.contactForm
      .get(control)
      ?.valueChanges.pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage(control));
  }

  public updateErrorMessage(control: ContactFormControl): void {
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
    const translations = translationMessages;
    const currentLang = this.translate.currentLang as LanguageOptionsType;
    return translations[key][currentLang];
  }

  private showSnackBar(message: string): void {
    this._snackBar.openFromComponent(ContactMeSnackbarComponent, {
      data: message,
      duration: this.snackBarDurationInSeconds * 1000,
    });
  }
}
