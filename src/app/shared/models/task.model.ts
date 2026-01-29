import { TaskStatus } from './task-status.model';

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
