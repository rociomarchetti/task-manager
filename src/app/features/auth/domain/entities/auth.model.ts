import { User } from '@shared/user.model';

export enum AuthTab {
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
}

export const AuthTabsIndex: Record<AuthTab, number> = {
  [AuthTab.LOGIN]: 0,
  [AuthTab.SIGN_UP]: 1,
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
