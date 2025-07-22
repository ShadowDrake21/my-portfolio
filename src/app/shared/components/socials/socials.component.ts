import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-socials',
  imports: [ThemeClassDirective, AsyncPipe],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css',
})
export class SocialsComponent {
  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
