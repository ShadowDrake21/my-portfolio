import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { workingExperienceContent } from './content/working-experience.content';

@Component({
  selector: 'app-working-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './working-experience.component.html',
  styleUrl: './working-experience.component.css',
})
export class WorkingExperienceComponent {
  workingExperienceContent = workingExperienceContent;
}
