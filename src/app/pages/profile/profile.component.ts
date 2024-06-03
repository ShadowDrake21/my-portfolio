import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StacksComponent } from '@shared/components/stacks/stacks.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { WorkingExperienceComponent } from './components/working-experience/working-experience.component';
import { EducationComponent } from './components/education/education.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    BasicInfoComponent,
    WorkingExperienceComponent,
    StacksComponent,
    EducationComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
