import { User } from '@shared/user.model';
import { UserTasksSummary } from '../../entities/dashboard.model';

export const featureKey = 'Dashboard_State';

export interface DashboardState {
  user: User;
  tasksData: UserTasksSummary;
}
