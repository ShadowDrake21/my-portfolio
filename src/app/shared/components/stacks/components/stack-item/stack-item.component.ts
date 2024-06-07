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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n', '.json');
}
@Component({
  selector: 'app-stack-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './stack-item.component.html',
  styleUrl: './stack-item.component.css',
  providers: [
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  ],
})
export class StackItemComponent implements OnInit {
  @Input({ required: true, alias: 'item' }) stackItem!: IStackItem;
  @Input({ required: true, alias: 'themeMode' })
  private transate = inject(TranslateService);

  themeMode$!: Observable<ThemeModeType | null>;

  ngOnInit(): void {
    this.transate.setDefaultLang('en');
  }

  preprocessTitle(title: string): string {
    return title.replace(/\s+/g, '_').toLowerCase();
  }
}
