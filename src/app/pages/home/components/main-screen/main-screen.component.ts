// angular stuff
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

// components
import { MainTasksComponent } from '@shared/components/main-tasks/main-tasks.component';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StyledLinkComponent,
    MainTasksComponent,
    TranslateModule,
  ],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',
})
export class MainScreenComponent implements OnInit {
  private store = inject(Store<ApplicationState>);
  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
