import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { myStoryContent } from './content/my-story.content';
import { ThemeModeType } from '@shared/models/themeMode.model';

@Component({
  selector: 'app-my-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-story.component.html',
  styleUrl: './my-story.component.css',
})
export class MyStoryComponent implements OnChanges {
  myStoryContent = myStoryContent;

  @Input({ required: true }) themeMode: ThemeModeType = 'light';

  ngOnChanges(changes: SimpleChanges): void {
    this.themeMode = changes['themeMode'].currentValue;
  }
}
