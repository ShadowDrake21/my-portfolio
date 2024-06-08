import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { educationContent } from './content/education.content';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@store/application/application.reducer';
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent implements OnInit {
  educationContent = educationContent;

  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;
  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
