import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import {
  mainStackProjectsContent,
  otherProjectsContent,
} from '@shared/content/projects.content';
import { IProject } from '@shared/models/project.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  technologyFilterContent,
  yearFilterContent,
} from './content/projects.content';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectItemComponent,
    NgbPaginationModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  mainStackProjectsContent = mainStackProjectsContent.reverse();
  otherProjectsContent = otherProjectsContent.reverse();

  technologyFilterContent = technologyFilterContent;
  yearFilterContent = yearFilterContent;

  itemsPerPage: number = 6;
  mainCurrentPage: number = 1;
  otherCurrentPage: number = 1;

  projectFiltrationForm = new FormGroup({
    technology: new FormControl(''),
    year: new FormControl(''),
  });

  getContentSize(tabType: 'main' | 'other'): number {
    return tabType === 'main'
      ? mainStackProjectsContent.length
      : otherProjectsContent.length;
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.tab.textLabel === 'Main stack') {
      this.mainCurrentPage = 1;
    } else {
      this.otherCurrentPage = 1;
    }
  }

  onFormChange() {
    console.log(this.projectFiltrationForm.value);
  }
}
