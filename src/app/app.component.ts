// angular stuff
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  filter,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

// components
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
import { ApplicationState } from './store/application/application.reducer';
import * as ApplicationActions from '../app/store/application/application.actions';
import * as ApplicationSelectors from '../app/store/application/application.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TranslateService],
})
export class AppComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private translate = inject(TranslateService);
  private store = inject(Store<ApplicationState>);

  isContactMePage: boolean = true;
  themeMode$!: Observable<ThemeModeType | null>;

  private destroy$$: Subject<void> = new Subject<void>();
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
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
          window.scrollTo(0, 0);
          if (this.router.url === '/contact-me') {
            this.isContactMePage = false;
          } else {
            this.isContactMePage = true;
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
