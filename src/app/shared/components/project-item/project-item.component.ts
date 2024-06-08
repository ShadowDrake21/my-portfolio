import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  otherTechnologiesContent,
  technologyStackContent,
} from '@shared/content/stacks.content';
import { IProject } from '@shared/models/project.model';
import { ThemeModeType } from '@shared/models/types.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css',
})
export class ProjectItemComponent implements OnInit, OnChanges {
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;
  @Input({ required: true, alias: 'item' }) projectItem!: IProject;
  copiedProjectItem!: IProject;

  private technologyStackContent = technologyStackContent;
  private otherTechnologiesContent = otherTechnologiesContent;

  ngOnInit(): void {
    this.updateTechnologyIconsPreparations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTechnologyIconsPreparations();
  }

  private updateTechnologyIconsPreparations() {
    this.copiedProjectItem = {
      ...this.projectItem,
      technologies: [...this.projectItem.technologies],
    };
    this.updateTechnologyIcons();
  }

  private updateTechnologyIcons(): void {
    this.copiedProjectItem.technologies =
      this.copiedProjectItem.technologies.map((technology) => {
        const newIconPath = this.findIconPath(technology);
        return newIconPath ? newIconPath : technology;
      });
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
