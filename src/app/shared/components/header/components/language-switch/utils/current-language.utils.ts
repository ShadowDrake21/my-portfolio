import { LanguageType } from '@shared/models/types.model';
import { retrieveFromLS } from '@shared/utils/localStorage.utils';

export function getCurrentLanguage(): LanguageType {
  return JSON.parse(retrieveFromLS('current_language') || 'en') as LanguageType;
}
