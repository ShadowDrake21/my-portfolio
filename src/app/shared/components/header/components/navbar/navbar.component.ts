// angular stuff
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import * as ApplicationActions from '@store/application/application.actions';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';
import { ThemeMode } from './enum/theme-mode.enum';
import { onDownloadCV } from './utils/download-cv.utils';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, TranslateModule, ThemeClassDirective, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  private currentThemeMode: ThemeModeType | null = null;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.themeMode$.subscribe((themeMode) => {
        this.currentThemeMode = themeMode;
      })
    );
  }

  onChangeTheme() {
    if (!this.currentThemeMode) return;
    const updatedThemeMode = this.getUpdatedThemeMode();
    this.dispatchThemeMode(updatedThemeMode);
  }

  private getUpdatedThemeMode(): ThemeModeType {
    return this.currentThemeMode === ThemeMode.LIGHT
      ? ThemeMode.DARK
      : ThemeMode.LIGHT;
  }

  private dispatchThemeMode(themeMode: ThemeModeType) {
    this.store.dispatch(ApplicationActions.setThemeMode({ themeMode }));
  }

  onDownloadCV = () => onDownloadCV();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
