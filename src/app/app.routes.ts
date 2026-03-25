import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/public-layout/public-layout').then(
        (m) => m.PublicLayout
      ),
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/feature-auth/auth.routes').then(
            (m) => m.AUTH_ROUTES
          ),
      },
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
    ],
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./core/layout/private-layout/private-layout').then(
        (m) => m.PrivateLayout
      ),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import(
            './features/dashboard/feature-dashboard/dashboard.routes'
          ).then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'boards',
        loadChildren: () =>
          import(
            './features/board-list/feature-board-list/board-list.routes'
          ).then((m) => m.BOARD_LIST_ROUTES),
      },
      {
        path: 'boards/:id',
        loadChildren: () =>
          import('./features/board/feature-board/board.routes').then(
            (m) => m.BOARD_ROUTES
          ),
      },
    ],
  },
];
