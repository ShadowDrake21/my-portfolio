import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';
import { allProjectsContent } from '@shared/content/projects.content';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectItemComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  allProjectsContent = allProjectsContent;

  public lastProjectContent = this.allProjectsContent
    .splice(this.allProjectsContent.length - 4, this.allProjectsContent.length)
    .reverse();
}
