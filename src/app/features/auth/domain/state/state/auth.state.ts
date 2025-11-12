import { User } from '@shared/models/user.model';
import { AuthTab } from '../../entities/auth.model';

export const authFeatureKey = 'Auth_State';

export interface AuthState {
  defaultSelectedTab: AuthTab;
  requestedPath: string;
  user: User;
}
