import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { technologyStackContent } from '@shared/content/stacks.content';
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

  ngOnInit(): void {
    this.projectItem.technologies.forEach((technology, index) => {
      const newIconPath = this.technologyStackContent.find(
        (stackItem) => stackItem.title === technology
      )?.icon;

      if (newIconPath) {
        this.projectItem.technologies[index] = newIconPath;
      }
    });
  }
}
