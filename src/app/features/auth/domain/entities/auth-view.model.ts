import { User } from '@shared/user.model';

export interface AuthViewModel {
  defaultSelectedTab: number;
  isLoginChecked: boolean;
  requestedPath: string;
  user: User;
}
