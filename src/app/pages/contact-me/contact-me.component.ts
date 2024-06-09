// angular stuff
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// components
import { ContactFormComponent } from './components/contact-form/contact-form.component';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
})
export class ContactMeComponent implements OnInit {
  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
