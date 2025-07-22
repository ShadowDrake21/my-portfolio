import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { MainTasksComponent } from '@shared/components/main-tasks/main-tasks.component';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-main-screen',
  imports: [
    AsyncPipe,
    StyledLinkComponent,
    MainTasksComponent,
    TranslateModule,
    ThemeClassDirective,
  ],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',
})
export class MainScreenComponent {
  private readonly store = inject(Store<ApplicationState>);
  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
