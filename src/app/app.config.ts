import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { applicationReducer } from './store/application/application.reducer';
import { ApplicationEffects } from './store/application/application.effects';
import '@angular/localize/init';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  HttpLoaderFactory,
  MultiTranslateHttpLoader,
} from '@shared/utils/translate.utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ application: applicationReducer }),
    provideEffects([ApplicationEffects]),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient): MultiTranslateHttpLoader => {
            return new MultiTranslateHttpLoader(http, {
              resources: [
                { prefix: 'src/assets/i18n/home', suffix: '.json' },
                { prefix: 'src/assets/i18n/profile', suffix: '.json' },
                { prefix: 'src/assets/i18n/projects', suffix: '.json' },
                { prefix: 'src/assets/i18n/contact-me', suffix: '.json' },
              ],
            });
          },
          deps: [HttpClient],
        },
      })
    ),
  ],
};
