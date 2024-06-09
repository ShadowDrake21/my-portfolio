// angular stuff
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

// content
import { workingExperienceContent } from './content/working-experience.content';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-working-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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
