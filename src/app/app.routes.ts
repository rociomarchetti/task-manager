import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
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
      // Ejemplo de más rutas privadas:
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('./features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
      // },
    ],
  },
];
