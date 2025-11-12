export interface UserTasksSummary {
  tasks: Array<Task>;
  userId: number;
}

export interface Task {
  createdAt: Date;
  description?: string;
  dueDate?: Date;
  id: string;
  status: TaskStatus;
  title: string;
  updatedAt?: Date;
  userId: number;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface TaskAmounts {
  pending: number;
  inProgress: number;
  completed: number;
}
