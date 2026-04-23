import { Board, Task, TaskAmounts, TaskStatus } from '@shared/models';

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

export function getTasksDueInNext7Days(tasks: Task[]): Task[] {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  end.setHours(23, 59, 59, 999);

  const startTime = start.getTime();
  const endTime = end.getTime();

  return tasks
    ?.filter((t) => {
      if (!t.dueDate) return false;
      if (t.status === TaskStatus.DONE) return false;

      const dueTime = new Date(t.dueDate).getTime();

      return dueTime >= startTime && dueTime <= endTime;
    })
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 3);
}

export function getRecentlyStatusChangedTasks(tasks: Task[]): Task[] {
  return tasks
    ?.slice()
    .filter((t) => !!t.updatedAt && t.status !== TaskStatus.DONE)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3);
}

export function getCurrentBoards(boards: Board[]): Board[] {
  return boards
    ?.slice()
    .filter((t) => t.isWip)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);
}

export function getStrokeDasharray(tasks: TaskAmounts | undefined): string {
  const totalAmount = getTotalTasks(tasks);
  const completed = tasks?.completed ?? 0;
  const circumference = 2 * Math.PI * 36;

  const progress =
    totalAmount > 0 ? (completed / totalAmount) * circumference : 0;

  return `${progress} ${circumference}`;
}

export function getPorcentajeAvance(tasks: TaskAmounts | undefined): number {
  const totalAmount = getTotalTasks(tasks);
  const completed = tasks?.completed ?? 0;
  if (totalAmount === 0) return 0;
  return Math.round((completed / totalAmount) * 100);
}

function getTotalTasks(tasks: TaskAmounts | undefined): number {
  const completed = tasks?.completed ?? 0;
  const inProgress = tasks?.inProgress ?? 0;
  const pending = tasks?.pending ?? 0;

  return completed + inProgress + pending;
}
