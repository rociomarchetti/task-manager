import { User } from '@shared/user.model';

export interface AuthViewModel {
  defaultSelectedTab: number;
  requestedPath: string;
  user: User;
}
