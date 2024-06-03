import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StackItemComponent } from './components/stack-item/stack-item.component';
import {
  languageStackContent,
  technologyStackContent,
} from '../../content/stacks.content';

@Component({
  selector: 'app-stacks',
  standalone: true,
  imports: [CommonModule, StackItemComponent],
  templateUrl: './stacks.component.html',
  styleUrl: './stacks.component.css',
})
export class StacksComponent {
  technologyStackContent = technologyStackContent;
  languageStackContent = languageStackContent;
}
