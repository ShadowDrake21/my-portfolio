import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { mainTasksContent } from './content/mainTasks.content';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-tasks',
  imports: [TranslateModule, ThemeClassDirective, AsyncPipe],
  templateUrl: './main-tasks.component.html',
  styleUrl: './main-tasks.component.css',
})
export class MainTasksComponent {
  readonly mainTasksContent = mainTasksContent;

  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
