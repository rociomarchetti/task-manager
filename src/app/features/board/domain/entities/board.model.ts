import { Task } from '@shared/models';

export interface TaskListsData {
  pending: Array<Task>;
  inProgress: Array<Task>;
  completed: Array<Task>;
}
