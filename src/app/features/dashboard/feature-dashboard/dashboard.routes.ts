import { Routes } from '@angular/router';
import { DashboardFacade } from '../domain/application/dashboard.facade';
import { provideState } from '@ngrx/store';
import { featureKey } from '../domain/state/state/dashboard.state';
import { DashboardEffects, dashboardReducerFunction } from '../domain/state';
import { provideEffects } from '@ngrx/effects';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((m) => m.DashboardFeature),
    providers: [
      DashboardFacade,
      provideState(featureKey, dashboardReducerFunction),
      provideEffects([DashboardEffects]),
    ],
  },
];
