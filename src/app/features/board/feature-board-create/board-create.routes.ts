import { Routes } from '@angular/router';

export const BOARD_CREATE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./board-create').then((m) => m.BoardCreateFeature),
    providers: [
      //DashboardFacade,
      //provideState(dashboardFeatureKey, dashboardReducerFunction),
      //provideEffects([DashboardEffects]),
    ],
  },
];
