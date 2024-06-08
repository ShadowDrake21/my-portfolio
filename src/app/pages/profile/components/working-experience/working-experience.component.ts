import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { workingExperienceContent } from './content/working-experience.content';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { Observable } from 'rxjs';
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-working-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './working-experience.component.html',
  styleUrl: './working-experience.component.css',
})
export class WorkingExperienceComponent implements OnInit {
  workingExperienceContent = workingExperienceContent;

  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
