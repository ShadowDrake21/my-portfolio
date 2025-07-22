import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';

import { saveToLS } from '@shared/utils/localStorage.utils';

import { LanguageType } from '@shared/models/types.model';
import { ApplicationState } from '@store/application/application.reducer';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { ThemeClassDirective } from '@shared/directives/theme-class.directive';
import { AsyncPipe } from '@angular/common';
import { getCurrentLanguage } from './utils/current-language.utils';
import { languageIcons } from './icons/language-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-language-switch',
  imports: [
    MatMenuModule,
    MatButtonModule,
    ClickOutsideDirective,
    TranslateModule,
    ThemeClassDirective,
    AsyncPipe,
  ],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.css',
})
export class LanguageSwitchComponent implements OnInit, AfterViewInit {
  private readonly store = inject(Store<ApplicationState>);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('languageSwitchDropdown')
  private languageSwitchDropdown!: ElementRef<HTMLUListElement>;

  themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
  currentLanguage$$ = new BehaviorSubject<LanguageType>(getCurrentLanguage());
  currentLanguageImg: string = '';

  ngOnInit(): void {
    this.translate.use(this.currentLanguage$$.getValue());
    this.updateLanguageImage(this.currentLanguage$$.getValue());
    this.updateLanguageImageOnLanguageChange();
  }

  private updateLanguageImageOnLanguageChange() {
    this.currentLanguage$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => {
        this.updateLanguageImage(language);
      });
  }

  ngAfterViewInit(): void {
    this.setActiveLanguage();
    this.setupLanguageSwitchListener();
  }

  toggleLanguageDropdown(event: MouseEvent) {
    event?.stopPropagation();
    this.languageSwitchDropdown.nativeElement.classList.toggle('show');
  }

  closeDropdown() {
    this.languageSwitchDropdown.nativeElement.classList.remove('show');
  }

  private setActiveLanguage(): void {
    const languageElements = this.getLanguagesHtmlElements();
    const activeElement = languageElements.find((li) =>
      this.isLanguageActive(li)
    );
    languageElements.forEach((li) => li.classList.remove('active'));
    activeElement?.classList.add('active');
  }

  private isLanguageActive(li: HTMLLIElement): boolean {
    return li.dataset?.['language'] === this.currentLanguage$$.value;
  }

  private getLanguagesHtmlElements(): HTMLLIElement[] {
    return Array.from(
      this.languageSwitchDropdown.nativeElement.children
    ) as HTMLLIElement[];
  }

  private setupLanguageSwitchListener() {
    this.languageSwitchDropdown.nativeElement.addEventListener(
      'click',
      (event) => this.setupLanguageSwitchChange(event)
    );
  }

  private setupLanguageSwitchChange(event: Event) {
    const languageElement = this.getLanguageElement(event);
    const selectedLanguage = this.getSelectedLanguage(languageElement);
    this.changeLanguage(selectedLanguage);
  }

  private getLanguageElement(event: Event): HTMLLIElement | null {
    return (event.target as HTMLElement).closest(
      'li.language-switch__option'
    ) as HTMLLIElement;
  }

  private getSelectedLanguage(element: HTMLLIElement | null): LanguageType {
    return element?.dataset?.['language'] as LanguageType;
  }

  private changeLanguage(language: LanguageType): void {
    saveToLS('current_language', language);
    this.currentLanguage$$.next(language);
    this.translate.use(language);
    this.setActiveLanguage();
    this.closeDropdown();
  }

  updateLanguageImage(language: LanguageType) {
    this.currentLanguageImg = languageIcons[language] || languageIcons.en;
  }
}
