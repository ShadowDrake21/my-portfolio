import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThemeModeType } from '@shared/models/themeMode.model';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css',
})
export class SocialsComponent {}
