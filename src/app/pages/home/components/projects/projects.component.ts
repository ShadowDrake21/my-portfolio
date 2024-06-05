import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';
import { mainStackProjectsContent } from '@shared/content/projects.content';
import { IProject } from '@shared/models/project.model';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectItemComponent, StyledLinkComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit, OnChanges {
  mainStackProjectsContent = mainStackProjectsContent;

  @Input({ required: true }) themeMode: ThemeModeType = 'light';

  public lastProjects$!: Observable<IProject[]>;

  ngOnInit(): void {
    this.lastProjects$ = of(
      [...this.mainStackProjectsContent]
        .slice(
          this.mainStackProjectsContent.length - 4,
          this.mainStackProjectsContent.length
        )
        .reverse()
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.themeMode = changes['themeMode'].currentValue;
  }
}
