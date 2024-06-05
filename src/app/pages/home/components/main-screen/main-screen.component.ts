import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainTasksComponent } from '@shared/components/main-tasks/main-tasks.component';
import { StyledLinkComponent } from '@shared/components/styled-link/styled-link.component';
import { ThemeModeType } from '@shared/models/themeMode.model';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [CommonModule, RouterLink, StyledLinkComponent, MainTasksComponent],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',
})
export class MainScreenComponent implements OnChanges {
  @Input({ required: true }) themeMode: ThemeModeType = 'light';

  ngOnChanges(changes: SimpleChanges): void {
    this.themeMode = changes['themeMode'].currentValue;
  }
}
