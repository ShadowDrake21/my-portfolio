import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { ThemeModeService } from '@core/services/themeMode.service';

import * as ApplicationActions from './application.actions';

@Injectable()
export class ApplicationEffects {
  private actions$ = inject(Actions);
  private readonly themeModeService = inject(ThemeModeService);

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

  setThemeMode = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.setThemeMode),
      exhaustMap(({ themeMode }) =>
        this.themeModeService.saveThemeMode(themeMode).pipe(
          tap(() => {
            console.log(`Theme mode set to: ${themeMode}`);
            this.themeModeService.themeMode.set(themeMode);
          }),
          map(() => ApplicationActions.setThemeModeSuccess({ themeMode })),
          catchError(() => of(ApplicationActions.setThemeModeFailure()))
        )
      )
    )
  );
}
