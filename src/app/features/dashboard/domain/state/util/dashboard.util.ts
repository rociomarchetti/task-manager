import { Task, TaskStatus } from '../../entities/dashboard.model';

export const countTasksByStatus = (tasks: Task[]) => ({
  pending: tasks?.filter((t) => t.status === TaskStatus.PENDING).length,
  inProgress: tasks?.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
  completed: tasks?.filter((t) => t.status === TaskStatus.DONE).length,
});

export function getRecentlyCreatedTasks(tasks: Task[]): Task[] {
  return tasks
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);
}

export function getUpcomingDueDateTasks(tasks: Task[]): Task[] {
  return tasks
    ?.slice()
    .filter((t) => t.status !== TaskStatus.DONE && !!t.dueDate)
    .sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    )
    .slice(0, 3);
}

export function getRecentlyStatusChangedTasks(tasks: Task[]): Task[] {
  return tasks
    ?.slice()
    .filter((t) => !!t.updatedAt)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3);
}
