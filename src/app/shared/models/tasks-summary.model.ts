import { Task } from './task.model';

export interface UserTasksSummary {
  tasks: Array<Task>;
  userId: number;
}
