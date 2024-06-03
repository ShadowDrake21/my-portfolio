import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';
import { allProjectsContent } from '@shared/content/projects.content';
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
  allProjectsContent = allProjectsContent;

  public lastProjects$!: Observable<IProject[]>;

  ngOnInit(): void {
    console.log('all projects content', allProjectsContent);
    this.lastProjects$ = of(
      this.allProjectsContent
        .slice(
          this.allProjectsContent.length - 4,
          this.allProjectsContent.length
        )
        .reverse()
    );
  }
}
