// angular stuff
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// content
import { educationContent } from './content/education.content';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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
