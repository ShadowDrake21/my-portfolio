import { Component } from '@angular/core';

import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { WorkingExperienceComponent } from './components/working-experience/working-experience.component';
import { EducationComponent } from './components/education/education.component';
import { StacksComponent } from '@shared/components/stacks/stacks.component';

@Component({
  selector: 'app-profile',
  imports: [
    BasicInfoComponent,
    WorkingExperienceComponent,
    StacksComponent,
    EducationComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
