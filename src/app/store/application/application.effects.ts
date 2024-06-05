import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationState } from './application.reducer';

import * as ApplicationActions from './application.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { retrieveFromLS } from '@shared/utils/localStorage.utils';
import { ThemeModeService } from '@core/services/themeMode.service';

@Injectable()
export class ApplicationEffects {
  private actions$ = inject(Actions);
  private themeModeService = inject(ThemeModeService);

  loadThemeMode = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.loadThemeMode),
      exhaustMap(() =>
        this.themeModeService.loadThemeMode().pipe(
          map((themeMode) =>
            themeMode
              ? ApplicationActions.loadThemeModeSuccess({ themeMode })
              : ApplicationActions.loadThemeModeFailure()
          ),
          catchError(() => of(ApplicationActions.loadThemeModeFailure()))
        )
      )
    )
  );
}
