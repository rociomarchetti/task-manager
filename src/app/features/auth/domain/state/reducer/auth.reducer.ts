import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import * as fromActions from '../actions/auth.actions';

export const authInitialState: AuthState = {
  defaultSelectedTab: null,
  requestedPath: null,
  user: null,
};

const authReducer = createReducer(
  authInitialState,
  on(fromActions.AuthViewActions.viewInitialisedSucceeded, (state, action) => {
    return {
      ...state,
      defaultSelectedTab: action.defaultSelectedTab,
    };
  }),
  on(fromActions.LoginViewActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.authenticationUser,
    };
  }),
  on(fromActions.RegisterViewActions.registerSuccess, (state, action) => {
    return {
      ...state,
      user: action.authenticationUser,
    };
  }),
  on(fromActions.LogoutViewActions.logoutSuccess, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function authReducerFunction(state: AuthState, action: Action) {
  return authReducer(state, action);
}
