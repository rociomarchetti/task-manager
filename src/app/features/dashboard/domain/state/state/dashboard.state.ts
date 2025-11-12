import { User } from '@shared/models/user.model';
import { UserTasksSummary } from '../../entities/dashboard.model';

export const dashboardFeatureKey = 'Dashboard_State';

export interface DashboardState {
  user: User;
  tasksData: UserTasksSummary;
}
