import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';
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
  appThemeClass = input<ThemeModeType | null>(null);

  classSuffix = input<ClassSuffixType>('section');

  ngOnInit(): void {
    this.updateThemeClasses();
  }

  private updateThemeClasses(): void {
    const theme = this.appThemeClass();
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
