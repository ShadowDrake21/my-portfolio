import { createReducer, on } from '@ngrx/store';
import * as ApplicationActions from './application.actions';
import { ThemeModeType } from '@shared/models/types.model';

export interface ApplicationState {
  themeMode: ThemeModeType | null;
}

export const initialApplicationState: ApplicationState = {
  themeMode: null,
};

export const applicationReducer = createReducer(
  initialApplicationState,
  on(ApplicationActions.loadThemeModeSuccess, (state, { themeMode }) => ({
    ...state,
    themeMode,
  })),
  on(ApplicationActions.setThemeMode, (state, { themeMode }) => ({
    ...state,
    themeMode,
  })),
  on(ApplicationActions.loadThemeModeFailure, (state) => ({
    ...state,
    themeMode: 'light' as ThemeModeType,
  }))
);
