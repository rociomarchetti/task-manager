import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((m) => m.DashboardFeature),
    /*     providers: [
      AuthFacade,
      provideState(featureKey, authReducerFunction),
      provideEffects([AuthEffects]),
    ], */
  },
];
