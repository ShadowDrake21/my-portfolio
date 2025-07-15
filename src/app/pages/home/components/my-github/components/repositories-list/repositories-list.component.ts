// angular stuff
import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

// interfaces and types
import { IRepo } from '@shared/models/github.model';
import { ThemeModeType } from '@shared/models/types.model';

// pipes
import { TruncateTextPipe } from '@shared/pipes/truncate-text.pipe';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repositories-list',
  imports: [TruncateTextPipe, TranslateModule, AsyncPipe],
  templateUrl: './repositories-list.component.html',
  styleUrl: './repositories-list.component.css',
})
export class RepositoriesListComponent {
  private readonly store = inject(Store<ApplicationState>);

  repositories = input.required<IRepo[] | null>();
  themeMode$: Observable<ThemeModeType | null> = this.store.select(
    ApplicationSelectors.selectThemeMode
  );
}
