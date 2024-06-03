import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { educationContent } from './content/education.content';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  educationContent = educationContent;
}
