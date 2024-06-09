// angular stuff
import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';
import { from, map, Observable } from 'rxjs';

// interfaces and types
import { IRepo, IUser } from '@shared/models/github.model';

// environment
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private octokit = new Octokit({ auth: environment.github_access_token });

  getAuthenticatedUser(): Observable<IUser> {
    return from(this.octokit.request('GET /user')).pipe(
      map((response) => response.data as IUser)
    );
  }

  getLatestRepositories(): Observable<IRepo[]> {
    return from(
      this.octokit.request('GET /user/repos', {
        sort: 'created',
        direction: 'desc',
      })
    ).pipe(map((response) => response.data as IRepo[]));
  }
}
