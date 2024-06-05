import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemeModeService } from '@core/services/themeMode.service';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { retrieveFromLS, saveToLS } from '@shared/utils/localStorage.utils';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationActions from '@store/application/application.actions';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private store = inject(Store<ApplicationState>);
  private themeModeService = inject(ThemeModeService);

  themeMode$!: Observable<ThemeModeType | null>;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }

  onChangeTheme() {
    this.themeMode$
      .pipe(
        filter((value) => !!value),
        switchMap((themeMode) => (themeMode === 'light' ? 'dark' : 'lignt'))
      )
      .subscribe((updatedThemeMode) => {
        if (updatedThemeMode === 'light' || updatedThemeMode === 'dark') {
          console.log('updatedThemeMode', updatedThemeMode);
          this.store.dispatch(
            ApplicationActions.setThemeMode({ themeMode: updatedThemeMode })
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
