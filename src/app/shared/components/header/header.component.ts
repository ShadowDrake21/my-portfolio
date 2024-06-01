import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LanguageSwitchComponent, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
