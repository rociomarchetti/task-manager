export interface UserTasksSummary {
  tasks: Array<Task>;
  userId: number;
}

export interface Task {
  description?: string;
  dueDate?: Date;
  id: string;
  status: TaskStatus;
  title: string;
  userId: number;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
