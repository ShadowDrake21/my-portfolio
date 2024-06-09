import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { retrieveFromLS, saveToLS } from '@shared/utils/localStorage.utils';
import { CommonModule } from '@angular/common';
import { ApplicationState } from '@store/application/application.reducer';
import { Store } from '@ngrx/store';
import * as ApplicationSelectors from '@store/application/application.selectors';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { languageType, ThemeModeType } from '@shared/models/types.model';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    ClickOutsideDirective,
    TranslateModule,
  ],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.css',
})
export class LanguageSwitchComponent implements OnInit, AfterViewInit {
  private store = inject(Store<ApplicationState>);
  private translate = inject(TranslateService);

  @ViewChild('languageSwitchDropdown')
  languageSwitchDropdown!: ElementRef<HTMLUListElement>;

  private isListenerAttached = false;

  themeMode$!: Observable<ThemeModeType | null>;
  currentLanguage$$: BehaviorSubject<languageType> =
    new BehaviorSubject<languageType>('en');

  currentLanguageImg!: string;

  ngOnInit(): void {
    this.themeMode$ = this.store.select(ApplicationSelectors.selectThemeMode);
    const currentLanguageStr = retrieveFromLS('current_language');
    if (currentLanguageStr) {
      const currentLanguageCode = JSON.parse(
        currentLanguageStr
      ) as languageType;
      this.currentLanguage$$.next(currentLanguageCode);

      this.translate.use(currentLanguageCode);
      console.log('loadedLanguage', this.translate.currentLang);
    }
    this.currentLanguage$$.subscribe((language) => {
      this.updateLanguageImage(language);
    });
  }

  onToggleLanguageSwitch(event: MouseEvent) {
    event?.stopPropagation();
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
                li.classList.toggle('active', li === liElement);
              }
            );

            saveToLS('current_language', choosenLanguage);
            this.currentLanguage$$.next(choosenLanguage as languageType);
            this.translate.use(choosenLanguage);
            console.log('currentLanguage', this.translate.currentLang);
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

  clickedOutside(): void {
    const el = this.languageSwitchDropdown.nativeElement;
    el.classList.remove('show');
  }
}
