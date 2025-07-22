import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { StackItemComponent } from './components/stack-item/stack-item.component';

import {
  languageStackContent,
  otherTechnologiesContent,
  technologyStackContent,
} from '@shared/content/stacks.content';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-stacks',
  imports: [
    AsyncPipe,
    ThemeClassDirective,
    StackItemComponent,
    TranslateModule,
  ],
  templateUrl: './stacks.component.html',
  styleUrl: './stacks.component.css',
})
export class StacksComponent {
  readonly content = {
    technologyStack: technologyStackContent,
    otherTechnologies: otherTechnologiesContent,
    languageStack: languageStackContent,
  };

  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
