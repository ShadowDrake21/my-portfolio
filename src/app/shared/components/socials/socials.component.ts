// angular stuff
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-socials',
  imports: [ThemeClassDirective, AsyncPipe],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css',
})
export class SocialsComponent {
  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
