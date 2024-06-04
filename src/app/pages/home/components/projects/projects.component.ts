import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';
import { mainStackProjectsContent } from '@shared/content/projects.content';
import { IProject } from '@shared/models/project.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectItemComponent, StyledLinkComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  mainStackProjectsContent = mainStackProjectsContent;

  public lastProjects$!: Observable<IProject[]>;

  ngOnInit(): void {
    this.lastProjects$ = of(
      this.mainStackProjectsContent
        .slice(
          this.mainStackProjectsContent.length - 4,
          this.mainStackProjectsContent.length
        )
        .reverse()
    );
  }
}
