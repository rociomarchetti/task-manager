import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import * as fromActions from '../actions/auth.actions';

export const authInitialState: AuthState = {
  defaultSelectedTab: null,
  isLoginChecked: false,
  requestedPath: null,
  user: null,
};

const authReducer = createReducer(
  authInitialState,
  on(fromActions.LoginViewActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.authenticationUser,
      isLoginChecked: true,
    };
  }),
  on(fromActions.RegisterViewActions.registerSuccess, (state, action) => {
    return {
      ...state,
      user: action.authenticationUser,
      isLoginChecked: true,
    };
  }),
  on(fromActions.LogoutViewActions.logoutSuccess, (state) => {
    return {
      ...state,
      user: null,
      isLoginChecked: false,
    };
  })
);

export function authReducerFunction(state: AuthState, action: Action) {
  return authReducer(state, action);
}
