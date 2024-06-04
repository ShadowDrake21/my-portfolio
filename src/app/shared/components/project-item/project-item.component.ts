import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  otherTechnologiesContent,
  technologyStackContent,
} from '@shared/content/stacks.content';
import { IProject } from '@shared/models/project.model';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css',
})
export class ProjectItemComponent implements OnInit {
  @Input({ required: true, alias: 'item' }) projectItem!: IProject;

  private technologyStackContent = technologyStackContent;
  private otherTechnologiesContent = otherTechnologiesContent;

  ngOnInit(): void {
    this.updateTechnologyIcons();
  }

  private updateTechnologyIcons(): void {
    this.projectItem.technologies = this.projectItem.technologies.map(
      (technology) => {
        const newIconPath = this.findIconPath(technology);
        return newIconPath ? newIconPath : technology;
      }
    );
  }

  private findIconPath(technology: string): string | undefined {
    const stackItem = this.technologyStackContent.find(
      (item) => item.title === technology
    );

    if (stackItem) {
      return stackItem.icon;
    } else {
      const otherItem = this.otherTechnologiesContent.find(
        (item) => item.title === technology
      );
      return otherItem ? otherItem.icon : undefined;
    }
  }
}
