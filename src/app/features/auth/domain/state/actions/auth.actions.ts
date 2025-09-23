import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthTab } from '../../entities/auth.model';
import { User } from '@shared/user.model';

export const AuthViewActions = createActionGroup({
  source: '[Authentication]  Auth View',
  events: {
    'View Initialised': emptyProps(),
    'View Initialised Succeeded': props<{
      defaultSelectedTab: AuthTab;
    }>(),
    'View Destroyed': emptyProps(),
  },
});

export const LoginViewActions = createActionGroup({
  source: '[Authentication]  Login View',
  events: {
    Login: emptyProps(),

    'Login success': props<{
      authenticationUser: User;
    }>(),

    'Login error': props<{
      error: string;
    }>(),
  },
});

export const SignupViewActions = createActionGroup({
  source: '[Authentication]  Signup View',
  events: {
    Signup: emptyProps(),

    'Signup success': props<{
      authenticationUser: User;
    }>(),

    'Signup error': emptyProps(),
  },
});

export const LogoutViewActions = createActionGroup({
  source: '[Authentication]  Logout View',
  events: {
    Logout: emptyProps(),
    'Logout success': emptyProps(),
    'Logout error': emptyProps(),
  },
});

export const RequestedPathActions = createActionGroup({
  source: '[Authentication] Requested Path',
  events: {
    'Set requested path': props<{
      requestedPath: string;
    }>(),

    'Load requested path': emptyProps(),

    'Clean requested path': emptyProps(),
  },
});
