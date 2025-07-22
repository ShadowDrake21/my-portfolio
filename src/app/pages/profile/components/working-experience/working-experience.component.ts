import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { workingExperienceContent } from './content/working-experience.content';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-working-experience',
  imports: [AsyncPipe, TranslateModule, ThemeClassDirective],
  templateUrl: './working-experience.component.html',
  styleUrl: './working-experience.component.css',
})
export class WorkingExperienceComponent {
  readonly workingExperienceContent = workingExperienceContent;

  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
