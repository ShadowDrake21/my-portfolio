import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}
