import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IStackItem } from '@shared/models/stack.model';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { Observable } from 'rxjs';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stack-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack-item.component.html',
  styleUrl: './stack-item.component.css',
})
export class StackItemComponent {
  @Input({ required: true, alias: 'item' }) stackItem!: IStackItem;
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;
}
