import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRepo } from '@shared/models/github.model';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { TruncateTextPipe } from '@shared/pipes/truncate-text.pipe';
import { ApplicationState } from '@store/application/application.reducer';
import { Observable } from 'rxjs';
import * as ApplicationSelectors from '@store/application/application.selectors';

@Component({
  selector: 'app-repositories-list',
  standalone: true,
  imports: [CommonModule, TruncateTextPipe],
  templateUrl: './repositories-list.component.html',
  styleUrl: './repositories-list.component.css',
})
export class RepositoriesListComponent {
  @Input({ alias: 'repositories', required: true }) repositories$!: Observable<
    IRepo[]
  >;
  @Input({ alias: 'themeMode', required: true })
  themeMode$!: Observable<ThemeModeType | null>;
}
