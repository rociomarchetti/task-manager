import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/feature-auth/auth.routes').then(
            (m) => m.AUTH_ROUTES
          ),
      },
      /*       {
        path: 'newRoute',
        canActivate: [AuthGuard],
        loadChildren: () =>
         
      }, */
    ],
  },
];
