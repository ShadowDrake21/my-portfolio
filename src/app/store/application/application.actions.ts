import { createAction, props } from '@ngrx/store';
import { ThemeModeType } from '@shared/models/types.model';

export const loadThemeMode = createAction('[Application] LoadThemeMode');
export const loadThemeModeSuccess = createAction(
  '[Application] LoadThemeModeSuccess',
  props<{ themeMode: ThemeModeType }>()
);
export const loadThemeModeFailure = createAction(
  '[Application] LoadThemeModeFailure'
);

export const setThemeMode = createAction(
  '[Application] SetThemeMode',
  props<{ themeMode: ThemeModeType }>()
);
export const setThemeModeSuccess = createAction(
  '[Application] setThemeModeSuccess',
  props<{ themeMode: ThemeModeType }>()
);
export const setThemeModeFailure = createAction(
  '[Application] setThemeModeSuccessFailure'
);
