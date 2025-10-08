import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthViewModel } from '../entities/auth-view.model';
import { LoginRequest, RegisterRequest } from '../entities/auth.model';
import * as fromActions from '../state/actions/auth.actions';
import { AuthState } from '../state/state/auth.state';
import * as fromSelectors from '../state/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store<AuthState>);
  viewModel$: Observable<AuthViewModel> = this.store.select(
    fromSelectors.selectAuthViewModel
  );

  viewInitialised(): void {
    this.store.dispatch(fromActions.AuthViewActions.viewInitialised());
  }

  logIn(userData: LoginRequest): void {
    this.store.dispatch(
      fromActions.LoginViewActions.login({ loginRequest: userData })
    );
  }

  register(userData: RegisterRequest): void {
    this.store.dispatch(
      fromActions.RegisterViewActions.register({ registerRequest: userData })
    );
  }

  logOut(): void {
    this.store.dispatch(fromActions.LogoutViewActions.logout());
  }
}
