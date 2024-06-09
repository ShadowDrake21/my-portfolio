// angular stuff
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// services
import { ThemeModeService } from '@core/services/themeMode.service';

// created ngrx stuff
import * as ApplicationActions from './application.actions';

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

  setThemeMode = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.setThemeMode),
      exhaustMap(({ themeMode }) =>
        this.themeModeService.saveThemeMode(themeMode).pipe(
          map(() => ApplicationActions.setThemeModeSuccess({ themeMode })),
          catchError(() => of(ApplicationActions.setThemeModeFailure()))
        )
      )
    )
  );
}
