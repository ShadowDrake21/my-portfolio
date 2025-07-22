import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import * as ApplicationSelectors from '@store/application/application.selectors';
import { ApplicationState } from '@store/application/application.reducer';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-story',
  imports: [TranslateModule, ThemeClassDirective, AsyncPipe],
  templateUrl: './my-story.component.html',
  styleUrl: './my-story.component.css',
})
export class MyStoryComponent {
  private readonly store = inject(Store<ApplicationState>);

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);

  getItemTitleTranslationId(index: number): string {
    return `myStoryItemTitle_${index}`;
  }

  getItemTextTranslationId(itemIndex: number, paragraphIndex: number): string {
    return `myStoryItemText_${itemIndex}_${paragraphIndex}`;
  }
}
