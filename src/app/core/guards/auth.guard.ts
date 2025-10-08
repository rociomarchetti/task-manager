import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuthActions from '../../features/auth/domain/state/actions/auth.actions';
import { AuthService } from '../services/auth-service/auth-service';

export const AuthGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedInSync();
  const requestedPath = state.url;

  const handleUnauthenticated = () => {
    const store = inject(Store);
    if (requestedPath && !requestedPath.startsWith('/auth')) {
      store.dispatch(
        fromAuthActions.RequestedPathActions.setRequestedPath({ requestedPath })
      );
    }
    router.navigate(['/auth'], {
      state: { returnUrl: requestedPath },
    });
    return false;
  };

  if (isLoggedIn) {
    return true;
  } else {
    return handleUnauthenticated();
  }
};
