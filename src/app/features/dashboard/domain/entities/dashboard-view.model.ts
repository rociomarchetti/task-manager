import { Task, TaskAmounts } from '@shared/models';

export interface DashboardViewModel {
  recentlyCreatedTasks: Array<Task>;
  recentlyUpdatedTasks: Array<Task>;
  tasksAmounts: TaskAmounts;
  tasksDueSoon: Array<Task>;
  userName: string;
}
