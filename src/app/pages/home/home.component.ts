import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { StacksComponent } from '@shared/components/stacks/stacks.component';
import { MyGithubComponent } from './components/my-github/my-github.component';
import { MyStoryComponent } from './components/my-story/my-story.component';
import { ProjectsComponent } from '../projects/projects.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MainScreenComponent,
    StacksComponent,
    MyGithubComponent,
    MyStoryComponent,
    ProjectsComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
