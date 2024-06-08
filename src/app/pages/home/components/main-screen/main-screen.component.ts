import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MainTasksComponent } from '@shared/components/main-tasks/main-tasks.component';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';
import { ThemeModeType } from '@shared/models/types.model';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [CommonModule, RouterLink, StyledLinkComponent, MainTasksComponent],
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
