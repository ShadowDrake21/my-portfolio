import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { filter, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationActions from '@store/application/application.actions';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;
  private currentThemeMode: ThemeModeType | null = null;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.initializeThemeMode();
  }

  onChangeTheme() {
    if (this.currentThemeMode) {
      const updatedThemeMode =
        this.currentThemeMode === 'light'
          ? ('dark' as ThemeModeType)
          : ('light' as ThemeModeType);

      if (updatedThemeMode !== this.currentThemeMode) {
        console.log('onChangeTheme()', updatedThemeMode);
        this.store.dispatch(
          ApplicationActions.setThemeMode({ themeMode: updatedThemeMode })
        );
      }
    }
  }

  initializeThemeMode() {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
    this.subscription.add(
      this.themeMode$.subscribe((themeMode) => {
        this.currentThemeMode = themeMode;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
