// angular stuff
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// components
import { SocialsComponent } from '../socials/socials.component';
import { StyledLinkComponent } from '../styled-link/styled-link.component';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    StyledLinkComponent,
    SocialsComponent,
    TranslateModule,
    ThemeClassDirective,
    AsyncPipe,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
