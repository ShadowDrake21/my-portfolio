import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@store/application/application.reducer';
import { Observable } from 'rxjs';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeModeType } from '@shared/models/types.model';

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
    MatButtonModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  private store = inject(Store<ApplicationState>);

  private initialMainStackProjectsContent: IProject[] = [];
  copiedMainStackProjectsContent: IProject[] = [];
  copiedOtherProjectsContent: IProject[] = [];

  technologyFilterContent = technologyFilterContent;
  yearFilterContent = yearFilterContent;

  itemsPerPage: number = 4;
  mainCurrentPage: number = 1;
  otherCurrentPage: number = 1;

  themeMode$!: Observable<ThemeModeType | null>;

  projectFiltrationForm = new FormGroup({
    technology: new FormControl(''),
    year: new FormControl(''),
  });

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);

    this.initialMainStackProjectsContent = [
      ...mainStackProjectsContent,
    ].reverse();

    this.copiedMainStackProjectsContent = [
      ...this.initialMainStackProjectsContent,
    ];
    this.copiedOtherProjectsContent = [...otherProjectsContent].reverse();
  }

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
    const formValue = this.projectFiltrationForm.value;

    if (formValue.technology && formValue.year) {
      this.copiedMainStackProjectsContent = this.projectFilter(
        this.initialMainStackProjectsContent,
        'technology',
        formValue.technology
      );
      this.copiedMainStackProjectsContent = this.projectFilter(
        this.copiedMainStackProjectsContent,
        'year',
        formValue.year
      );
    } else if (formValue.technology && !formValue.year) {
      this.copiedMainStackProjectsContent = this.projectFilter(
        this.initialMainStackProjectsContent,
        'technology',
        formValue.technology
      );
    } else if (!formValue.technology && formValue.year) {
      this.copiedMainStackProjectsContent = this.projectFilter(
        this.initialMainStackProjectsContent,
        'year',
        formValue.year!
      );
    }
  }

  private projectFilter(
    array: IProject[],
    criteria_type: 'technology' | 'year',
    criteria_value: string
  ): IProject[] {
    let returnArray: IProject[] = [];
    if (criteria_type === 'technology') {
      returnArray = array.filter((project) =>
        project.technologies.includes(criteria_value)
      );
    } else {
      returnArray = array.filter((project) =>
        project.year.includes(criteria_value)
      );
    }

    return returnArray;
  }

  loadAllProjects() {
    this.copiedMainStackProjectsContent = this.initialMainStackProjectsContent;
    this.projectFiltrationForm.reset();
  }

  checkIfDataChanged() {
    return this.checkIfArraysEqual(
      this.initialMainStackProjectsContent,
      this.copiedMainStackProjectsContent
    );
  }

  private checkIfArraysEqual(arr1: IProject[], arr2: IProject[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
        return false;
      }
    }
    return true;
  }
}
