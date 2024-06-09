import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Resource } from '@shared/models/types.model';
import { forkJoin, map, Observable } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'src/assets/i18n/', '.json');
}

export const mergeObjectsRecursively = (
  objects: Record<string, unknown>[]
): Record<string, unknown> => {
  const mergedObject: Record<string, unknown> = {};

  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (!mergedObject[key]) {
            mergedObject[key] = {};
          }
          if (
            typeof mergedObject[key] === 'object' &&
            mergedObject[key] !== null
          ) {
            mergedObject[key] = mergeObjectsRecursively([
              mergedObject[key] as Record<string, unknown>,
              obj[key] as Record<string, unknown>,
            ]);
          }
        } else {
          mergedObject[key] = obj[key];
        }
      }
    }
  }

  return mergedObject;
};

export class MultiTranslateHttpLoader implements TranslateLoader {
  resources: Resource[] = [];
  withCommon!: boolean;

  constructor(
    private readonly http: HttpClient,
    {
      resources,
      withCommon = true,
    }: { resources: Resource[]; withCommon?: boolean }
  ) {
    this.resources = resources;
    this.withCommon = withCommon;
  }

  getTranslation(lang: string): Observable<Record<string, unknown>> {
    let resources: Resource[] = [...this.resources];

    if (this.withCommon) {
      resources = [
        { prefix: '../assets/i18n/common/', suffix: '.json' },
        ...resources,
      ];
    }

    return forkJoin(
      resources.map((config: Resource) => {
        return this.http.get<Record<string, unknown>>(
          `${config.prefix}${lang}${config.suffix}`
        );
      })
    ).pipe(
      map((response: Record<string, unknown>[]) =>
        mergeObjectsRecursively(response)
      )
    );
  }
}
