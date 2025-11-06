import { Task, TaskStatus } from '../../entities/dashboard.model';

export const countTasksByStatus = (tasks: Task[]) => ({
  pending: tasks?.filter((t) => t.status === TaskStatus.PENDING).length,
  inProgress: tasks?.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
  completed: tasks?.filter((t) => t.status === TaskStatus.DONE).length,
});
