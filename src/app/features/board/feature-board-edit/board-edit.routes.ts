import { Routes } from '@angular/router';

export const BOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./board-edit').then((m) => m.BoardEditFeature),
    providers: [
      //DashboardFacade,
      //provideState(dashboardFeatureKey, dashboardReducerFunction),
      //provideEffects([DashboardEffects]),
    ],
  },
];
