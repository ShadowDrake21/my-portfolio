// angular stuff
import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

// components
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialsComponent } from '../socials/socials.component';

// created ngrx stuff
import { ApplicationState } from 'src/app/store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe,
    LanguageSwitchComponent,
    NavbarComponent,
    SocialsComponent,
    TranslateModule,
    ThemeClassDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input({ required: true }) isHeaderFull: boolean = true;

  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
