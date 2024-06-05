import { Injectable, Input } from '@angular/core';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { retrieveFromLS, saveToLS } from '@shared/utils/localStorage.utils';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeModeService {
  private _themeMode$$: BehaviorSubject<ThemeModeType> =
    new BehaviorSubject<ThemeModeType>('light');

  constructor() {
    this.loadThemeMode();
  }

  loadThemeMode() {
    const themeModeStr = retrieveFromLS('themeMode');

    if (themeModeStr) {
      const parsedThemeMode: string = JSON.parse(themeModeStr) as string;
      if (parsedThemeMode === 'light' || parsedThemeMode === 'dark') {
        this._themeMode$$.next(parsedThemeMode);
      }
    }
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
