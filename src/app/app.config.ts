import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ApiService, MockService } from './services';
import { environment } from '../environments/environment';

export const API_SERVICE = new InjectionToken<ApiService | MockService>('API_SERVICE');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: API_SERVICE,
      useClass: environment.production ? ApiService : MockService,
    },
  ],
};
