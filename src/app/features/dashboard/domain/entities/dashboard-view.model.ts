export interface DashboardViewModel {
  userName: string;
  tasksAmounts: {
    pending: number;
    inProgress: number;
    completed: number;
  };
}
