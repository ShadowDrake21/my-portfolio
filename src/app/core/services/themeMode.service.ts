// angular stuff
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

// utils
import { retrieveFromLS, saveToLS } from '@shared/utils/localStorage.utils';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

@Injectable({ providedIn: 'root' })
export class ThemeModeService {
  private _themeMode$$: BehaviorSubject<ThemeModeType> =
    new BehaviorSubject<ThemeModeType>('light');

  constructor() {
    this.loadThemeMode();
  }

  loadThemeMode(): Observable<ThemeModeType | undefined> {
    const themeModeStr = retrieveFromLS('themeMode');

    if (themeModeStr) {
      const parsedThemeMode: string = JSON.parse(themeModeStr) as string;
      if (parsedThemeMode === 'light' || parsedThemeMode === 'dark') {
        return of(parsedThemeMode as ThemeModeType);
      }
    }
    return of(undefined);
  }

  saveThemeMode(value: ThemeModeType): Observable<void> {
    return of(saveToLS('themeMode', value));
  }

  set themeMode(value: ThemeModeType) {
    console.log('setter themeMode', value);
    this._themeMode$$.next(value);
    saveToLS('themeMode', value);
  }

  get themeMode(): Observable<ThemeModeType> {
    return this._themeMode$$.asObservable();
  }
}
