import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAeroCms } from '@aero-cms/angular-sdk';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAeroCms({
      baseUrl: environment.cmsApiUrl,
      ...(environment.siteSlug ? { siteSlug: environment.siteSlug } : {}),
    }),
  ],
};
