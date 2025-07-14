// angular stuff
import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';
import { catchError, from, map, Observable } from 'rxjs';

// interfaces and types
import { IRepo, IUser } from '@shared/models/github.model';

// environment
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly octokit!: Octokit;

  constructor() {
    if (!environment.github_access_token) {
      throw new Error('GitHub access token is not configured');
    }
    this.octokit = new Octokit({ auth: environment.github_access_token });
  }

  getAuthenticatedUser(): Observable<IUser> {
    return from(this.octokit.request('GET /user')).pipe(
      map((response) => {
        if (!response.data) {
          throw new Error('No user data received');
        }
        return response.data as IUser;
      }),
      catchError((error) => {
        throw new Error(`Failed to fetch user: ${error.message}`);
      })
    );
  }

  getLatestRepositories(limit: number = 10): Observable<IRepo[]> {
    return from(
      this.octokit.request('GET /user/repos', {
        sort: 'created',
        direction: 'desc',
        per_page: limit,
      })
    ).pipe(
      map((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid repositories data received');
        }
        return response.data as IRepo[];
      }),
      catchError((error) => {
        throw new Error(`Failed to fetch repositories: ${error.message}`);
      })
    );
  }
}
