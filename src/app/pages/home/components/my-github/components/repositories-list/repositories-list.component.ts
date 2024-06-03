import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IRepo } from '@shared/models/github.model';
import { TruncateTextPipe } from '@shared/pipes/truncate-text.pipe';
import { Observable } from 'rxjs';

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
}
