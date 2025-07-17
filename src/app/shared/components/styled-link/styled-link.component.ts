// angular stuff
import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { Store } from '@ngrx/store';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'helper-styled-link',
  imports: [AsyncPipe, RouterLink, ThemeClassDirective],
  templateUrl: './styled-link.component.html',
  styleUrl: './styled-link.component.css',
})
export class StyledLinkComponent {
  private readonly store = inject(Store<ApplicationState>);

  link = input.required<string>();
  title = input.required<string>();
  themeMode$: Observable<ThemeModeType | null> = this.store.select(
    ApplicationSelectors.selectThemeMode
  );
}
