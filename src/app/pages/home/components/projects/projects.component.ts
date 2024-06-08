import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProjectItemComponent } from '@shared/components/project-item/project-item.component';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';
import { mainStackProjectsContent } from '@shared/content/projects.content';
import { IProject } from '@shared/models/project.model';
import { Observable, of } from 'rxjs';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ApplicationState } from '@store/application/application.reducer';
import { Store } from '@ngrx/store';
import { ThemeModeType } from '@shared/models/types.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectItemComponent,
    StyledLinkComponent,
    TranslateModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  mainStackProjectsContent = mainStackProjectsContent;
  private store = inject(Store<ApplicationState>);

  lastProjects$!: Observable<IProject[]>;
  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
    this.lastProjects$ = of(
      [...this.mainStackProjectsContent]
        .slice(
          this.mainStackProjectsContent.length - 4,
          this.mainStackProjectsContent.length
        )
        .reverse()
    );
  }
}
