// angular stuff
import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

// services
import { GithubService } from 'src/app/core/services/github.service';

// components
import { GitProfileComponent } from './components/git-profile/git-profile.component';
import { RepositoriesListComponent } from './components/repositories-list/repositories-list.component';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';
import { IRepo, IUser } from '@shared/models/github.model';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-my-github',
  imports: [
    AsyncPipe,
    GitProfileComponent,
    RepositoriesListComponent,
    TranslateModule,
    ThemeClassDirective,
  ],
  templateUrl: './my-github.component.html',
  styleUrl: './my-github.component.css',
})
export class MyGithubComponent {
  private readonly store = inject(Store<ApplicationState>);
  private githubService = inject(GithubService);

  user$: Observable<IUser> = this.githubService.getAuthenticatedUser();
  repos$: Observable<IRepo[]> = this.githubService
    .getLatestRepositories()
    .pipe(map((response) => response.slice(0, 9)));
  themeMode$: Observable<ThemeModeType | null> = this.store.select(
    ApplicationSelectors.selectThemeMode
  );
}
