import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainTasksComponent } from '@shared/components/main-tasks/main-tasks.component';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule, MainTasksComponent],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css',
})
export class BasicInfoComponent {}
