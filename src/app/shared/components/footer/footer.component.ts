import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { StyledLinkComponent } from '../styled-link/styled-link.component';
import { SocialsComponent } from '../socials/socials.component';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@store/application/application.reducer';
import { Observable } from 'rxjs';
import { ThemeModeType } from '@shared/models/themeMode.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, StyledLinkComponent, SocialsComponent],
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
