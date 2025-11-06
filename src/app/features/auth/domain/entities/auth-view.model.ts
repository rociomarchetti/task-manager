import { User } from '@shared/models/user.model';

export interface AuthViewModel {
  defaultSelectedTab: number;
  requestedPath: string;
  user: User;
}
