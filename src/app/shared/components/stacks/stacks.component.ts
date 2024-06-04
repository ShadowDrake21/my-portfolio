import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StackItemComponent } from './components/stack-item/stack-item.component';
import {
  languageStackContent,
  otherTechnologiesContent,
  technologyStackContent,
} from '@shared/content/stacks.content';

@Component({
  selector: 'app-stacks',
  standalone: true,
  imports: [CommonModule, StackItemComponent],
  templateUrl: './stacks.component.html',
  styleUrl: './stacks.component.css',
})
export class StacksComponent {
  technologyStackContent = technologyStackContent;
  otherTechnologiesContent = otherTechnologiesContent;
  languageStackContent = languageStackContent;
}
