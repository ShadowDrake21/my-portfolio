import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IStackItem } from '@shared/models/stack.interface';

@Component({
  selector: 'app-stack-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack-item.component.html',
  styleUrl: './stack-item.component.css',
})
export class StackItemComponent {
  @Input({ required: true, alias: 'item' }) stackItem!: IStackItem;
}
