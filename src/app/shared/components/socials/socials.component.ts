// angular stuff
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css',
})
export class SocialsComponent {
  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<string | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
