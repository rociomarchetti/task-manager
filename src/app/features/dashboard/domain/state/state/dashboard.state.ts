import { User } from '@shared/models';
import { UserTasksSummary } from '../../entities/dashboard.model';

export const dashboardFeatureKey = 'Dashboard_State';

export interface DashboardState {
  user: User;
  tasksData: UserTasksSummary;
}
