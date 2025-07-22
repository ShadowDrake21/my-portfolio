import { AsyncPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { IStackItem } from '@shared/models/stack.model';
import { ThemeModeType } from '@shared/models/types.model';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-stack-item',
  imports: [
    AsyncPipe,
    ThemeClassDirective,
    TranslateModule,
    LowerCasePipe,
    TitleCasePipe,
  ],
  templateUrl: './stack-item.component.html',
  styleUrl: './stack-item.component.css',
})
export class StackItemComponent {
  @Input({ required: true, alias: 'item' }) stackItem!: IStackItem;
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;
}
