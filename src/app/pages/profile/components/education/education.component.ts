import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { educationContent } from './content/education.content';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-education',
  imports: [AsyncPipe, TranslateModule, ThemeClassDirective],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  readonly educationContent = educationContent;

  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
