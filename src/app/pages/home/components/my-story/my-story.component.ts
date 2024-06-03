import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { myStoryContent } from './content/my-story.content';

@Component({
  selector: 'app-my-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-story.component.html',
  styleUrl: './my-story.component.css',
})
export class MyStoryComponent {
  myStoryContent = myStoryContent;
}
