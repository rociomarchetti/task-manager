import { Task, TaskAmounts, Board } from '@shared/models';

export interface DashboardViewModel {
  currentBoards: Array<Board>;
  recentlyCreatedTasks: Array<Task>;
  recentlyUpdatedTasks: Array<Task>;
  tasksAmounts: TaskAmounts;
  tasksDueSoon: Array<Task>;
  userName: string;
}
