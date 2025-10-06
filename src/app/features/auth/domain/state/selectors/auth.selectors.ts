import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, featureKey } from '../state/auth.state';
import { AuthViewModel } from '../../entities/auth-view.model';

export const selectAuthState = createFeatureSelector<AuthState>(featureKey);

export const selectAuthViewModel = createSelector(
  selectAuthState,
  (state): AuthViewModel => ({
    defaultSelectedTab: state?.defaultSelectedTab,
    isLoginChecked: state?.isLoginChecked,
    requestedPath: state?.requestedPath,
    user: state?.user,
  })
);
