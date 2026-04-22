import { User } from '@shared/models';
import { AuthTab } from '../../entities/auth.model';

export const authFeatureKey = 'Auth_State';

export interface AuthState {
  defaultSelectedTab: AuthTab | null;
  requestedPath: string | null;
  user: User | null;
}
