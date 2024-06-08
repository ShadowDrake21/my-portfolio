import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@store/application/application.reducer';
import { Observable } from 'rxjs';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-main-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-tasks.component.html',
  styleUrl: './main-tasks.component.css',
})
export class MainTasksComponent implements OnInit {
  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
