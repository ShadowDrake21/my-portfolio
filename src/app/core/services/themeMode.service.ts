// angular stuff
import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

// utils
import { retrieveFromLS, saveToLS } from '@shared/utils/localStorage.utils';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

const THEME_MODE_KEY = 'themeMode';

@Injectable({ providedIn: 'root' })
export class ThemeModeService {
  themeMode = signal<ThemeModeType>('light');

  constructor() {
    this.initializeThemeMode();
  }

  private initializeThemeMode(): void {
    const storedTheme = this.loadThemeModeFromStorage();
    if (storedTheme) this.themeMode.set(storedTheme);
  }

  private loadThemeModeFromStorage(): ThemeModeType | null {
    try {
      const themeModeStr = retrieveFromLS(THEME_MODE_KEY);

      if (!themeModeStr) return null;

      return this.loadThemeModeFromStorageParsing(themeModeStr);
    } catch (error) {
      return this.loadThemeModeFromStorageError(error);
    }
  }

  private loadThemeModeFromStorageParsing(
    themeModeStr: string
  ): ThemeModeType | null {
    const parsedThemeMode = JSON.parse(themeModeStr);
    return this.isValidThemeMode(parsedThemeMode) ? parsedThemeMode : null;
  }

  private loadThemeModeFromStorageError(error: unknown): null {
    console.error('Error loading theme mode from storage:', error);
    return null;
  }

  private isValidThemeMode(value: unknown): value is ThemeModeType {
    return value === 'light' || value === 'dark';
  }

  setThemeMode(value: ThemeModeType): void {
    if (!this.isValidThemeMode(value)) {
      this.setInvalidThemeMode(value);
      return;
    }

    this.themeMode.set(value);
    this.saveThemeModeToStorage(value);
  }

  private setInvalidThemeMode(value: ThemeModeType): void {
    console.warn(`Invalid theme mode attempted: ${value}`);
  }

  private saveThemeModeToStorage(value: ThemeModeType): void {
    try {
      saveToLS(THEME_MODE_KEY, value);
    } catch (error) {
      console.error('Error saving theme mode to storage:', error);
    }
  }

  loadThemeMode(): Observable<ThemeModeType | null> {
    return of(this.loadThemeModeFromStorage());
  }

  saveThemeMode(value: ThemeModeType): Observable<void> {
    return of(this.saveThemeModeToStorage(value));
  }

  toggleThemeMode(): void {
    const current = this.themeMode();
    this.setThemeMode(current === 'light' ? 'dark' : 'light');
  }
}
