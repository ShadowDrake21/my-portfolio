import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';
import { allProjectsContent } from '@shared/content/projects.content';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {}
