import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialsComponent } from '../socials/socials.component';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/application/application.reducer';
import { Observable } from 'rxjs';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitchComponent,
    NavbarComponent,
    SocialsComponent,
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
