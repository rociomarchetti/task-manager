import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from '../state/auth.state';
import { AuthViewModel } from '../../entities/auth-view.model';
import { AuthTab, AuthTabsIndex } from '../../entities/auth.model';
import { getUserInitials } from '../util/auth.util';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

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
    defaultSelectedTab: state.defaultSelectedTab
      ? AuthTabsIndex[state.defaultSelectedTab]
      : AuthTabsIndex[AuthTab.LOGIN],
    requestedPath: state?.requestedPath ?? '',
    user: user!,
    userInitials: state.user ? getUserInitials(state?.user) : '',
  })
);
