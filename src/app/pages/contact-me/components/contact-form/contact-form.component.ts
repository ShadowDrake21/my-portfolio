import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SocialsComponent } from '@shared/components/socials/socials.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    SocialsComponent,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  nameErrorMessage!: string;
  emailErrorMessage!: string;

  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    textarea: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(500),
    ]),
  });

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
  }

  ngOnInit(): void {}

  onFormSubmit() {
    console.log('form', this.contactForm.value);
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
      this.nameErrorMessage = 'You must enter a value';
    } else if (this.contactForm.controls.email.hasError('email')) {
      this.nameErrorMessage = 'Not a valid email';
    } else {
      this.nameErrorMessage = '';
    }
  }
}
