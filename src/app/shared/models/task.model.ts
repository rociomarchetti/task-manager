import { TaskStatus } from './task-status.model';

export interface Task {
  createdAt: Date;
  description?: string;
  dueDate?: Date;
  id: string;
  boardId: string;
  status: TaskStatus;
  title: string;
  updatedAt?: Date;
  userId: number;
}

export interface NewTaskData {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  boardId: string;
}
