import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'helper-styled-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './styled-link.component.html',
  styleUrl: './styled-link.component.css',
})
export class StyledLinkComponent {
  @Input({ required: true }) link!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true, alias: 'themeMode' })
  themeMode$!: Observable<ThemeModeType | null>;
}
