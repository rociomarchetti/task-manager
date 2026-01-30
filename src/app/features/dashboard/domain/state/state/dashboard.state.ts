import { User, UserBoardsSummary, UserTasksSummary } from '@shared/models';

export const dashboardFeatureKey = 'Dashboard_State';

export interface DashboardState {
  user: User;
  tasksData: UserTasksSummary;
  boardsData: UserBoardsSummary;
}
