// angular stuff
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

// interfaces and types
import { IRepo } from '@shared/models/github.model';
import { ThemeModeType } from '@shared/models/types.model';

// pipes
import { TruncateTextPipe } from '@shared/pipes/truncate-text.pipe';

@Component({
  selector: 'app-repositories-list',
  standalone: true,
  imports: [CommonModule, TruncateTextPipe, TranslateModule],
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
