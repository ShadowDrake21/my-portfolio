// angular stuff
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

// interfaces and types
import { ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'helper-styled-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './styled-link.component.html',
  styleUrl: './styled-link.component.css',
})
export class StyledLinkComponent {
  @Input({ required: true }) link!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;
}
