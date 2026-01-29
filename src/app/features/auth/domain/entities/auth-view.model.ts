import { User } from '@shared/models';

export interface AuthViewModel {
  defaultSelectedTab: number;
  requestedPath: string;
  user: User;
}
