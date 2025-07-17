// angular stuff
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// interfaces and types
import { IUser } from '@shared/models/github.model';
import { ThemeModeType } from '@shared/models/types.model';
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
  themeMode$: Observable<ThemeModeType | null> = this.store.select(
    ApplicationSelectors.selectThemeMode
  );
}
