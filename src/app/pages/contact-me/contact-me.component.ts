import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-contact-me',
  imports: [ContactFormComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
})
export class ContactMeComponent {
  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
