import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemeModeService } from '@core/services/themeMode.service';
import { ThemeModeType } from '@shared/models/themeMode.model';
import { retrieveFromLS, saveToLS } from '@shared/utils/localStorage.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private themeModeService = inject(ThemeModeService);
  themeMode: ThemeModeType = 'light';
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.themeModeService.themeMode.subscribe((mode: ThemeModeType) => {
        this.themeMode = mode;
      })
    );
  }

  onChangeTheme() {
    this.themeMode = this.themeMode === 'light' ? 'dark' : 'light';
    this.themeModeService.themeMode = this.themeMode;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
