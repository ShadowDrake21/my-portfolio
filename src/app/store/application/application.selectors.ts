import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from './application.reducer';

export const selectApplicationState =
  createFeatureSelector<ApplicationState>('application');

export const selectThemeMode = createSelector(
  selectApplicationState,
  (state: ApplicationState) => state.themeMode
);
