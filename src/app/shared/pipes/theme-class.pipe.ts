import { Pipe, PipeTransform } from '@angular/core';
import { ThemeModeType } from '@shared/models/types.model';

@Pipe({
  name: 'themeClass',
  standalone: true,
})
export class ThemeClassPipe implements PipeTransform {
  transform(theme: ThemeModeType | null): { [key: string]: boolean } {
    return {
      'light-mode__section': theme === 'light',
      'dark-mode__section': theme === 'dark',
    };
  }
}
