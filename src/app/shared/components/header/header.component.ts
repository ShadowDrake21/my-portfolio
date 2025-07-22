import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialsComponent } from '../socials/socials.component';

import { ApplicationState } from 'src/app/store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

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
export class HeaderComponent {
  @Input({ required: true }) isHeaderFull: boolean = true;

  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
