import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUser } from '@shared/models/github.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-git-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './git-profile.component.html',
  styleUrl: './git-profile.component.css',
})
export class GitProfileComponent {
  @Input({ required: true, alias: 'profile' }) profile$!: Observable<IUser>;
}
