// angular stuff
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

// components
import { MainTasksComponent } from '@shared/components/main-tasks/main-tasks.component';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule, MainTasksComponent, TranslateModule],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css',
})
export class BasicInfoComponent implements OnInit {
  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }
}
