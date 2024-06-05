import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StackItemComponent } from './components/stack-item/stack-item.component';
import {
  languageStackContent,
  otherTechnologiesContent,
  technologyStackContent,
} from '@shared/content/stacks.content';
import { ThemeModeType } from '@shared/models/themeMode.model';

@Component({
  selector: 'app-stacks',
  standalone: true,
  imports: [CommonModule, StackItemComponent],
  templateUrl: './stacks.component.html',
  styleUrl: './stacks.component.css',
})
export class StacksComponent implements OnChanges {
  technologyStackContent = technologyStackContent;
  otherTechnologiesContent = otherTechnologiesContent;
  languageStackContent = languageStackContent;

  @Input({ required: true }) themeMode: ThemeModeType = 'light';

  ngOnChanges(changes: SimpleChanges): void {
    this.themeMode = changes['themeMode'].currentValue;
  }
}
