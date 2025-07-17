import { FormGroup, FormControl } from '@angular/forms';

export type ContactMeForm = FormGroup<{
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  message: FormControl<string | null>;
}>;
