import { User } from '@shared/user.model';
import { AuthTab } from '../../entities/auth.model';

export const featureKey = 'Auth_State';

export interface AuthState {
  defaultSelectedTab: AuthTab;
  requestedPath: string;
  user: User;
}
