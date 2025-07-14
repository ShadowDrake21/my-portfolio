// angular stuff
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, of } from 'rxjs';

// utils
import { retrieveFromLS, saveToLS } from '@shared/utils/localStorage.utils';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

const THEME_MODE_KEY = 'themeMode';

@Injectable({ providedIn: 'root' })
export class ThemeModeService {
  private _themeMode$$: BehaviorSubject<ThemeModeType>;

  constructor() {
    this._themeMode$$ = new BehaviorSubject<ThemeModeType>('light');
    this.initializeThemeMode();
  }

  private initializeThemeMode(): void {
    const storedTheme = this.loadThemeModeFromStorage();
    if (storedTheme) {
      this._themeMode$$.next(storedTheme);
    }
  }

  private loadThemeModeFromStorage(): ThemeModeType | null {
    try {
      const themeModeStr = retrieveFromLS(THEME_MODE_KEY);

      if (!themeModeStr) return null;

      const parsedThemeMode = JSON.parse(themeModeStr);
      return this.isValidThemeMode(parsedThemeMode) ? parsedThemeMode : null;
    } catch (error) {
      console.error('Error loading theme mode from storage:', error);
      return null;
    }
  }

  private isValidThemeMode(value: unknown): value is ThemeModeType {
    return value === 'light' || value === 'dark';
  }

  get themeMode$(): Observable<ThemeModeType> {
    return this._themeMode$$.asObservable().pipe(distinctUntilChanged());
  }

  setThemeMode(value: ThemeModeType): void {
    if (this.isValidThemeMode(value)) {
      console.warn(`Invalid theme mode attempted: ${value}`);
      return;
    }

    this._themeMode$$.next(value);
    this.saveThemeModeToStorage(value);
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
    const current = this._themeMode$$.value;
    this.setThemeMode(current === 'light' ? 'dark' : 'light');
  }
}
