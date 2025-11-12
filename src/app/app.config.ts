import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authFeatureKey } from './features/auth/domain/state/state/auth.state';
import { AuthEffects, authReducerFunction } from './features/auth/domain/state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    provideStore({ [authFeatureKey]: authReducerFunction }),
    provideEffects([AuthEffects]),
  ],
};
