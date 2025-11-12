import { Task, TaskAmounts } from './dashboard.model';

export interface DashboardViewModel {
  recentlyCreatedTasks: Array<Task>;
  recentlyUpdatedTasks: Array<Task>;
  tasksAmounts: TaskAmounts;
  tasksDueSoon: Array<Task>;
  userName: string;
}
