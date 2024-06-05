import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import {
  filter,
  map,
  Observable,
  pipe,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ThemeModeService } from '@core/services/themeMode.service';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from './store/application/application.reducer';
import * as ApplicationActions from '../app/store/application/application.actions';
import * as ApplicationSelectors from '../app/store/application/application.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private store = inject(Store<ApplicationState>);

  isContactMePage: boolean = true;
  themeMode$!: Observable<ThemeModeType | null>;

  private destroy$$: Subject<void> = new Subject<void>();
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);

    this.subscription.add(
      this.themeMode$
        .pipe(
          filter((value) => !value),
          tap(() => this.store.dispatch(ApplicationActions.loadThemeMode()))
        )
        .subscribe()
    );

    this.router.events
      .pipe(takeUntil(this.destroy$$))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === '/contact-me') {
            this.isContactMePage = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
    this.subscription.unsubscribe();
  }
}
