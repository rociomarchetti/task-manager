import { Board, Task, TaskStatus } from '@shared/models';

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

  const end = new Date();
  end.setDate(start.getDate() + 7);
  end.setHours(23, 59, 59, 999);

  return tasks
    ?.filter((t) => {
      if (!t.dueDate) return false;
      if (t.status === TaskStatus.DONE) return false;

      const due = new Date(t.dueDate);
      return due >= start && due <= end;
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
