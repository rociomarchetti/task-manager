import { Routes } from '@angular/router';

export const BOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./board').then((m) => m.BoardFeature),
    providers: [
      //DashboardFacade,
      //provideState(dashboardFeatureKey, dashboardReducerFunction),
      //provideEffects([DashboardEffects]),
    ],
  },
];
