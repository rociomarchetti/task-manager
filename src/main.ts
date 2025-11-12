import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/features/auth/domain/state/effects/auth.effects';
import { authReducerFunction } from 'app/features/auth/domain/state';
import { authFeatureKey } from 'app/features/auth/domain/state/state/auth.state';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    provideStore({ [authFeatureKey]: authReducerFunction }),
    provideEffects([AuthEffects]),
  ],
}).catch((err) => console.error(err));
