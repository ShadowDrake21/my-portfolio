import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { retrieveFromLS, saveToLS } from '@shared/utils/localStorage.utils';

type themeModeType = 'light' | 'dark';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  themeMode: themeModeType = 'light';

  ngOnInit(): void {
    const themeModeStr: string | null = retrieveFromLS('themeMode');

    if (themeModeStr) {
      this.themeMode = JSON.parse(themeModeStr) as themeModeType;
    }
  }

  onChangeTheme() {
    this.themeMode = this.themeMode === 'light' ? 'dark' : 'light';
    saveToLS('themeMode', this.themeMode);
  }
}