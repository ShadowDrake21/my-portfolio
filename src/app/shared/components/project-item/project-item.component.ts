import { AsyncPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import {
  otherTechnologiesContent,
  technologyStackContent,
} from '@shared/content/stacks.content';

import { IProject } from '@shared/models/project.model';
import { ThemeModeType } from '@shared/models/types.model';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-project-item',
  imports: [AsyncPipe, ThemeClassDirective, TranslateModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css',
})
export class ProjectItemComponent implements OnChanges {
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;
  @Input({ required: true, alias: 'item' }) projectItem!: IProject;

  private readonly technologyIcons = [
    ...technologyStackContent,
    ...otherTechnologiesContent,
  ];

  displayProjectItem!: IProject;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectItem']) {
      this.prepareProjectItemForDisplay();
    }
  }

  private prepareProjectItemForDisplay(): void {
    this.displayProjectItem = {
      ...this.projectItem,
      technologies: this.mapTechnologiesToIcons(this.projectItem.technologies),
    };
  }

  private mapTechnologiesToIcons(technologies: string[]): string[] {
    return technologies.map(
      (tech) =>
        this.technologyIcons.find((item) => item.title === tech)?.icon || tech
    );
  }
}
