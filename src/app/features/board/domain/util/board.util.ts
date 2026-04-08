import { Task, TaskStatus } from '@shared/models';

export const tasksByStatus = (tasks: Task[]) => ({
  pending: tasks?.filter((t) => t.status === TaskStatus.PENDING),
  inProgress: tasks?.filter((t) => t.status === TaskStatus.IN_PROGRESS),
  completed: tasks?.filter((t) => t.status === TaskStatus.DONE),
});
