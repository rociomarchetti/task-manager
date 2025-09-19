import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./features/auth/login.routes').then((m) => m.LOGIN_ROUTES),
      },
    ],
  },
];
