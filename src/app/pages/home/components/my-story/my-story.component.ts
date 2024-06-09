// angular stuff
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ApplicationState } from '@store/application/application.reducer';

@Component({
  selector: 'app-my-story',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-story.component.html',
  styleUrl: './my-story.component.css',
})
export class MyStoryComponent implements OnInit {
  private store = inject(Store<ApplicationState>);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  }

  getItemTitleTranslationId(index: number): string {
    return `myStoryItemTitle_${index}`;
  }

  getItemTextTranslationId(itemIndex: number, paragraphIndex: number): string {
    return `myStoryItemText_${itemIndex}_${paragraphIndex}`;
  }
}
