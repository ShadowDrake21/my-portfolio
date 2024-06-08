import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IStackItem } from '@shared/models/stack.model';
import { ThemeModeType } from '@shared/models/types.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stack-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './stack-item.component.html',
  styleUrl: './stack-item.component.css',
})
export class StackItemComponent {
  @Input({ required: true, alias: 'item' }) stackItem!: IStackItem;
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;
}
