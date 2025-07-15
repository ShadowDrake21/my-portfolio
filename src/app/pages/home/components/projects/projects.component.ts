// angular stuff
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

// components
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';

// content
import { mainStackProjectsContent } from '@shared/content/projects.content';

// interfaces and types
import { IProject } from '@shared/models/project.model';
import { ThemeModeType } from '@shared/models/types.model';

// created ngrx stuff
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
  readonly mainStackProjectsContent = mainStackProjectsContent;
  private readonly store = inject(Store<ApplicationState>);

  lastProjects$: Observable<IProject[]> = of(
    [...this.mainStackProjectsContent]
      .slice(
        this.mainStackProjectsContent.length - 4,
        this.mainStackProjectsContent.length
      )
      .reverse()
  );
  themeMode$: Observable<ThemeModeType | null> = this.store.select(
    ApplicationSelectors.selectThemeMode
  );
}
