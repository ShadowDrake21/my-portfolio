import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable, of } from 'rxjs';

type languageType = 'en' | 'pl' | 'ua';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.css',
})
export class LanguageSwitchComponent implements OnInit, AfterViewInit {
  @ViewChild('languageSwitchDropdown')
  languageSwitchDropdown!: ElementRef<HTMLUListElement>;

  private isListenerAttached = false;

  currentLanguage$$: BehaviorSubject<languageType> =
    new BehaviorSubject<languageType>('en');

  currentLanguageImg!: string;

  ngOnInit(): void {
    const currentLanguageStr = this.retrieveFromLS('current_language');
    if (currentLanguageStr) {
      this.currentLanguage$$.next(
        JSON.parse(currentLanguageStr) as languageType
      );
    }
    this.currentLanguage$$.subscribe((language) => {
      this.updateLanguageImage(language);
    });
  }

  onToggleLanguageSwitch() {
    const el = this.languageSwitchDropdown.nativeElement;
    el.classList.toggle('show');
  }

  ngAfterViewInit(): void {
    this.setActiveLanguage();
    this.onLanguageSwitch();
  }

  setActiveLanguage() {
    const language = this.currentLanguage$$.getValue();
    const sociaListEl = this.languageSwitchDropdown.nativeElement;
    (Array.from(sociaListEl.children) as Array<HTMLLIElement>)
      .find((li) => li.dataset?.['language'] === language)
      ?.classList.add('active');
  }

  onLanguageSwitch() {
    const sociaListEl = this.languageSwitchDropdown.nativeElement;

    if (!this.isListenerAttached) {
      sociaListEl.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const liElement = target.closest(
          'li.language-switch__option'
        ) as HTMLLIElement;

        if (liElement) {
          const choosenLanguage = liElement.dataset?.['language'];

          if (choosenLanguage) {
            (Array.from(sociaListEl.children) as Array<HTMLLIElement>).forEach(
              (li) => {
                if (li.classList.contains('active')) {
                  li.classList.remove('active');
                  return;
                }
              }
            );

            liElement.classList.add('active');
            this.saveToLS('current_language', choosenLanguage);
            this.currentLanguage$$.next(choosenLanguage as languageType);
          }
        }
      });

      this.isListenerAttached = true;
    }
  }

  updateLanguageImage(language: languageType) {
    switch (language) {
      case 'en':
        this.currentLanguageImg =
          '/assets/icons/language-switcher/english-flag.svg';
        break;
      case 'pl':
        this.currentLanguageImg =
          '/assets/icons/language-switcher/poland-flag.svg';
        break;
      case 'ua':
        this.currentLanguageImg =
          '/assets/icons/language-switcher/ukraine-flag.svg';
        break;
    }
  }

  saveToLS(name: string, data: string) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  retrieveFromLS(name: string): string | null {
    return localStorage.getItem(name) ?? null;
  }
}
