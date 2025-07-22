import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';

import {
  mainStackProjectsContent,
  otherProjectsContent,
} from '@shared/content/projects.content';
import {
  technologyFilterContent,
  yearFilterContent,
} from './content/projects.content';

import { IProject } from '@shared/models/project.model';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { checkIfArraysEqual } from './utils/projects.utils';

enum ProjectTab {
  MAIN = 'main',
  OTHER = 'other',
}

enum FilterType {
  TECHNOLOGY = 'technology',
  YEAR = 'year',
}

@Component({
  selector: 'app-projects',
  imports: [
    ProjectItemComponent,
    NgbPaginationModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
    ThemeClassDirective,
    SlicePipe,
    AsyncPipe,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  private readonly store = inject(Store<ApplicationState>);

  readonly ProjectTab = ProjectTab;
  readonly ITEMS_PER_PAGE = 4;

  private originalMainProjects: IProject[] = [];
  filteredMainProjects: IProject[] = [];
  otherProjects: IProject[] = [];

  content = {
    technologyFilter: technologyFilterContent,
    yearFilter: yearFilterContent,
  };

  currentPage = {
    [ProjectTab.MAIN]: 1,
    [ProjectTab.OTHER]: 1,
  };

  itemsPerPage: number = 4;
  mainCurrentPage: number = 1;
  otherCurrentPage: number = 1;

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);

  filterForm = new FormGroup({
    technology: new FormControl(''),
    year: new FormControl(''),
  });

  ngOnInit(): void {
    this.initializeProjects();
  }

  private initializeProjects(): void {
    this.originalMainProjects = [...mainStackProjectsContent].reverse();
    this.filteredMainProjects = [...this.originalMainProjects];
    this.otherProjects = [...otherProjectsContent].reverse();
  }

  getProjectCount(tab: ProjectTab): number {
    return tab === ProjectTab.MAIN
      ? this.originalMainProjects.length
      : this.otherProjects.length;
  }

  onTabChanged(event: MatTabChangeEvent) {
    const tab =
      event.tab.textLabel === 'Main stack' ? ProjectTab.MAIN : ProjectTab.OTHER;
    this.currentPage[tab] = 1;
  }

  onFilterChange() {
    const { technology, year } = this.filterForm.value;
    let filtered = [...this.originalMainProjects];

    if (technology) {
      filtered = this.filterProjects(
        filtered,
        FilterType.TECHNOLOGY,
        technology
      );
    }

    if (year) {
      filtered = this.filterProjects(filtered, FilterType.YEAR, year);
    }

    this.filteredMainProjects = filtered;
    this.currentPage[ProjectTab.MAIN] = 1;
  }

  private filterProjects(
    projects: IProject[],
    criteria: FilterType,
    value: string
  ): IProject[] {
    return projects.filter((project) =>
      criteria === FilterType.TECHNOLOGY
        ? project.technologies.includes(value)
        : project.year.includes(value)
    );
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredMainProjects = [...this.originalMainProjects];
    this.currentPage[ProjectTab.MAIN] = 1;
  }

  hasFilteresChanged(): boolean {
    return !checkIfArraysEqual(
      this.originalMainProjects,
      this.filteredMainProjects
    );
  }

  getPaginatedProjects(tab: ProjectTab): IProject[] {
    const projects =
      tab === ProjectTab.MAIN ? this.filteredMainProjects : this.otherProjects;

    const start = (this.currentPage[tab] - 1) * this.ITEMS_PER_PAGE;
    const end = this.currentPage[tab] * this.ITEMS_PER_PAGE;

    return projects.slice(start, end);
  }
}
