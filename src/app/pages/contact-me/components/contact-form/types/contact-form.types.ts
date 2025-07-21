export type TRANSLATE_MESSAGE_TYPES =
  | 'SUCCESS_MESSAGE'
  | 'ERROR_PREFIX'
  | 'REQUIRED_ERROR'
  | 'MIN_LENGTH_ERROR'
  | 'MAX_LENGTH_ERROR'
  | 'EMAIL_ERROR';

export type ContactFormControl = 'name' | 'email' | 'message';

export type translateMessagesType = {
  SUCCESS_MESSAGE: translateMessagesSetType;
  ERROR_PREFIX: translateMessagesSetType;
  REQUIRED_ERROR: translateMessagesSetType;
  MIN_LENGTH_ERROR: translateMessagesSetType;
  MAX_LENGTH_ERROR: translateMessagesSetType;
  EMAIL_ERROR: translateMessagesSetType;
};

export type translateMessagesSetType = {
  en: string;
  pl: string;
  ua: string;
};

export type LanguageOptionsType = 'en' | 'pl' | 'ua';
