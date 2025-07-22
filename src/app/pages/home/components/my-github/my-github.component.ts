import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { GithubService } from 'src/app/core/services/github.service';

import { GitProfileComponent } from './components/git-profile/git-profile.component';
import { RepositoriesListComponent } from './components/repositories-list/repositories-list.component';

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
  private readonly githubService = inject(GithubService);

  user$ = this.githubService.getAuthenticatedUser();
  repos$ = this.githubService
    .getLatestRepositories()
    .pipe(map((response) => response.slice(0, 9)));
  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
