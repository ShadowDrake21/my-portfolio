import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ThemeModeService } from '@core/services/themeMode.service';
import { ThemeModeType } from '@shared/models/types.model';

type ClassSuffixType =
  | 'section'
  | 'text'
  | 'git-profile'
  | 'repository'
  | 'header'
  | 'language-switch'
  | 'navbar'
  | 'tasks'
  | 'project-item'
  | 'stack-item'
  | 'styled-link';

@Directive({
  selector: '[appThemeClass]',
})
export class ThemeClassDirective implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly themeModeService = inject(ThemeModeService);
  appThemeClass = input<ThemeModeType | null>(null);

  classSuffix = input<ClassSuffixType>('section');

  private themeEffect = effect(() => {
    const theme = this.themeModeService.themeMode();
    this.updateThemeClasses(theme);
  });

  ngOnInit(): void {
    this.updateThemeClasses(this.themeModeService.themeMode());
  }

  private updateThemeClasses(theme: ThemeModeType): void {
    const suffix = this.classSuffix();

    this.el.nativeElement.classList.remove(
      `light-mode__${suffix}`,
      `dark-mode__${suffix}`
    );
    if (theme) {
      this.el.nativeElement.classList.add(`${theme}-mode__${suffix}`);
    }
  }
}
