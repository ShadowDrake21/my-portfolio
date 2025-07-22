import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { IUser } from '@shared/models/github.model';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { Store } from '@ngrx/store';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-git-profile',
  imports: [ThemeClassDirective, AsyncPipe, TranslateModule],
  templateUrl: './git-profile.component.html',
  styleUrl: './git-profile.component.css',
})
export class GitProfileComponent {
  private readonly store = inject(Store<ApplicationState>);

  profile = input.required<IUser | null>();
  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
