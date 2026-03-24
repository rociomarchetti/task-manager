import { Routes } from '@angular/router';

export const BOARD_LIST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./board-list').then((m) => m.BoardListFeature),
    providers: [
      //DashboardFacade,
      //provideState(dashboardFeatureKey, dashboardReducerFunction),
      //provideEffects([DashboardEffects]),
    ],
  },
];
