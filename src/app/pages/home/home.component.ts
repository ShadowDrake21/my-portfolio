// angular stuff
import { Component } from '@angular/core';

// components
import { StacksComponent } from '@shared/components/stacks/stacks.component';
import { MyGithubComponent } from './components/my-github/my-github.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MyStoryComponent } from './components/my-story/my-story.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

@Component({
  selector: 'app-home',
  imports: [
    MainScreenComponent,
    StacksComponent,
    MyGithubComponent,
    MyStoryComponent,
    ProjectsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
