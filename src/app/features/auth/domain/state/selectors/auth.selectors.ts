import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, featureKey } from '../state/auth.state';
import { AuthViewModel } from '../../entities/auth-view.model';
import { AuthTabsIndex } from '../../entities/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>(featureKey);

export const selectAuthenticatedUser = createSelector(
  selectAuthState,
  (state) => {
    return state?.user;
  }
);

export const selectAuthViewModel = createSelector(
  selectAuthState,
  selectAuthenticatedUser,
  (state, user): AuthViewModel => ({
    defaultSelectedTab: AuthTabsIndex[state?.defaultSelectedTab],
    requestedPath: state?.requestedPath,
    user,
  })
);
