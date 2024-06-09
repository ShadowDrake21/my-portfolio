// angular stuff
import { createReducer, on } from '@ngrx/store';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
import * as ApplicationActions from './application.actions';

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
