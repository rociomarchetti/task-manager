import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AuthFacade } from '../domain/application/auth.facade';
import { AuthEffects, authReducerFunction } from '../domain/state';
import { featureKey } from '../domain/state/state/auth.state';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth').then((m) => m.AuthFeature),
    providers: [
      AuthFacade,
      provideState(featureKey, authReducerFunction),
      provideEffects([AuthEffects]),
    ],
  },
];
