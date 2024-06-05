import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { StacksComponent } from '@shared/components/stacks/stacks.component';
import { MyGithubComponent } from './components/my-github/my-github.component';
import { MyStoryComponent } from './components/my-story/my-story.component';

import { FooterComponent } from '@shared/components/footer/footer.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ThemeModeService } from '@core/services/themeMode.service';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { Subscription } from 'rxjs';

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
