import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { Observable } from 'rxjs';
import { ThemeModeType } from '@shared/models/types.model';

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
