// angular stuff
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitchComponent,
    NavbarComponent,
    SocialsComponent,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input({ required: true }) isHeaderFull: boolean = true;

  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<string | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
