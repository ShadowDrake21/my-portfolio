import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.css',
})
export class LanguageSwitchComponent {
  @ViewChild('languageSwitchDropdown')
  languageSwitchDropdown!: ElementRef<HTMLUListElement>;

  currentLanguageImg: string =
    '/assets/icons/language-switcher/english-flag.svg';

  onLanguageSwitch(language: 'en' | 'pl' | 'ua') {
    console.log(language);
  }

  onToggleLanguageSwitch() {
    const el = this.languageSwitchDropdown.nativeElement;

    el.classList.toggle('show');
  }
}
