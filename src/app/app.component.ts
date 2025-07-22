import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

import { ApplicationState } from './store/application/application.reducer';
import * as ApplicationActions from '../app/store/application/application.actions';
import * as ApplicationSelectors from '../app/store/application/application.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TranslateService],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly store = inject(Store<ApplicationState>);

  isContactMePage: boolean = true;
  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);

  private destroy$$: Subject<void> = new Subject<void>();
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.dispatchThemeMode();
    this.trackRouterEvents();
  }

  private dispatchThemeMode(): void {
    this.subscription.add(
      this.themeMode$
        .pipe(
          filter((value) => !value),
          tap(() => this.store.dispatch(ApplicationActions.loadThemeMode()))
        )
        .subscribe()
    );
  }

  private trackRouterEvents(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$$))
      .subscribe((event: any) => {
        this.trackRouterEventsSubscription(event);
      });
  }

  private trackRouterEventsSubscription(event: any): void {
    if (event instanceof NavigationEnd) {
      window.scrollTo(0, 0);
      if (this.router.url === '/contact-me') {
        this.isContactMePage = false;
      } else {
        this.isContactMePage = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
    this.subscription.unsubscribe();
  }
}
