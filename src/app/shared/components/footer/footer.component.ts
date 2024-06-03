import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StyledLinkComponent } from '../styled-link/styled-link.component';
import { SocialsComponent } from '../socials/socials.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, StyledLinkComponent, SocialsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
