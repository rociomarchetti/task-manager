import { User, UserBoardsSummary, UserTasksSummary } from '@shared/models';

export const dashboardFeatureKey = 'Dashboard_State';

export interface DashboardState {
  user: User | null;
  tasksData: UserTasksSummary | null;
  boardsData: UserBoardsSummary | null;
  loading: boolean | null;
}
