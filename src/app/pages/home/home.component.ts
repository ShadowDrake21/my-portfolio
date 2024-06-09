// angular stuff
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// services
import { ThemeModeService } from '@core/services/themeMode.service';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

// components
import { StacksComponent } from '@shared/components/stacks/stacks.component';
import { MyGithubComponent } from './components/my-github/my-github.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MyStoryComponent } from './components/my-story/my-story.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MainScreenComponent,
    StacksComponent,
    MyGithubComponent,
    MyStoryComponent,
    ProjectsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private themeModeService = inject(ThemeModeService);

  themeMode!: ThemeModeType;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.themeModeService.themeMode.subscribe((mode: ThemeModeType) => {
        this.themeMode = mode;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
