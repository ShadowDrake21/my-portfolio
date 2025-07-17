import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactMeForm } from '@shared/models/forms.model';

@Injectable({
  providedIn: 'root',
})
export class ContactMeService {
  get contactMeForm(): ContactMeForm {
    return new FormGroup({
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
  }
}
