import { User } from '@shared/models/user.model';

export enum AuthTab {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export const AuthTabsIndex: Record<AuthTab, number> = {
  [AuthTab.LOGIN]: 0,
  [AuthTab.REGISTER]: 1,
};

export enum AuthQueryParams {
  INVITATION_CODE = 'invitation_code',
  EMAIL = 'email',
}

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
