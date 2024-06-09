// angular stuff
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-my-github',
  standalone: true,
  imports: [
    CommonModule,
    GitProfileComponent,
    RepositoriesListComponent,
    TranslateModule,
  ],
  templateUrl: './my-github.component.html',
  styleUrl: './my-github.component.css',
})
export class MyGithubComponent implements OnInit {
  private store = inject(Store<ApplicationState>);
  private githubService = inject(GithubService);

  user$!: Observable<IUser>;
  repos$!: Observable<IRepo[]>;
  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);

    this.user$ = this.githubService.getAuthenticatedUser();

    this.repos$ = this.githubService
      .getLatestRepositories()
      .pipe(map((response) => response.slice(0, 9)));
  }
}
