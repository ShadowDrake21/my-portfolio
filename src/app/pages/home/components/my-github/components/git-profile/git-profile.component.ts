// angular stuff
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// interfaces and types
import { IUser } from '@shared/models/github.model';
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-git-profile',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './git-profile.component.html',
  styleUrl: './git-profile.component.css',
})
export class GitProfileComponent {
  @Input({ required: true, alias: 'profile' }) profile$!: Observable<IUser>;
  @Input({ alias: 'themeMode', required: true })
  themeMode$!: Observable<ThemeModeType | null>;
}
