// angular stuff
import { createFeatureSelector, createSelector } from '@ngrx/store';

// created ngrx stuff
import { ApplicationState } from './application.reducer';

export const selectApplicationState =
  createFeatureSelector<ApplicationState>('application');

export const selectThemeMode = createSelector(
  selectApplicationState,
  (state: ApplicationState) => state.themeMode
);
