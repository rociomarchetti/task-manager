import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  AuthTab,
  LoginRequest,
  RegisterRequest,
} from '../../entities/auth.model';
import { User } from '@shared/models/user.model';

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
    Login: props<{
      loginRequest: LoginRequest;
    }>(),

    'Login success': props<{
      authenticationUser: User;
    }>(),

    'Login error': props<{
      error: string;
    }>(),
  },
});

export const RegisterViewActions = createActionGroup({
  source: '[Authentication]  Register View',
  events: {
    Register: props<{
      registerRequest: RegisterRequest;
    }>(),

    'Register success': props<{
      authenticationUser: User;
    }>(),

    'Register error': props<{
      error: string;
    }>(),
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
