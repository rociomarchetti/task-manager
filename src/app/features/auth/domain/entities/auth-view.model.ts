import { AuthTab } from './auth.model';

export interface AuthViewModel {
  form: {
    email: string;
    password: string;
  };
  isLoginChecked: boolean;
  requestedPath: string;
  defaultSelectedTab: AuthTab;
}
