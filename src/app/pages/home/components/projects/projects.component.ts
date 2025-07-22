import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';

import { mainStackProjectsContent } from '@shared/content/projects.content';

import { IProject } from '@shared/models/project.model';

import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';

@Component({
  selector: 'app-projects',
  imports: [
    AsyncPipe,
    ProjectItemComponent,
    StyledLinkComponent,
    TranslateModule,
    ThemeClassDirective,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  private readonly store = inject(Store<ApplicationState>);

  lastProjects$: Observable<IProject[]> = of(
    [...mainStackProjectsContent]
      .slice(
        mainStackProjectsContent.length - 4,
        mainStackProjectsContent.length
      )
      .reverse()
  );
  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
}
