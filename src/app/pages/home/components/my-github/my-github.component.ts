import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IRepo, IUser } from '@shared/models/github.model';
import { map, Observable } from 'rxjs';
import { GithubService } from 'src/app/core/services/github.service';
import { GitProfileComponent } from './components/git-profile/git-profile.component';
import { RepositoriesListComponent } from './components/repositories-list/repositories-list.component';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ApplicationState } from '@store/application/application.reducer';
import { Store } from '@ngrx/store';
import { ThemeModeType } from '@shared/models/types.model';
import { TranslateModule } from '@ngx-translate/core';

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
