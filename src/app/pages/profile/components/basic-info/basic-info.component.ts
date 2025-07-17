// angular stuff
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

// components
import { MainTasksComponent } from '@shared/components/main-tasks/main-tasks.component';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-basic-info',
  imports: [
    AsyncPipe,
    MainTasksComponent,
    TranslateModule,
    ThemeClassDirective,
  ],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css',
})
export class BasicInfoComponent {
  private readonly store = inject(Store<ApplicationState>);

  themeMode$: Observable<ThemeModeType | null> = this.store.select(
    ApplicationSelectors.selectThemeMode
  );
}
