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
import { ThemeModeType } from '@shared/models/themeMode.model';

@Component({
  selector: 'app-my-github',
  standalone: true,
  imports: [CommonModule, GitProfileComponent, RepositoriesListComponent],
  templateUrl: './my-github.component.html',
  styleUrl: './my-github.component.css',
})
export class MyGithubComponent implements OnInit, OnChanges {
  private githubService = inject(GithubService);

  @Input({ required: true }) themeMode: ThemeModeType = 'light';

  user$!: Observable<IUser>;
  repos$!: Observable<IRepo[]>;

  ngOnInit(): void {
    this.user$ = this.githubService.getAuthenticatedUser();

    this.repos$ = this.githubService
      .getLatestRepositories()
      .pipe(map((response) => response.slice(0, 9)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.themeMode = changes['themeMode'].currentValue;
  }
}
