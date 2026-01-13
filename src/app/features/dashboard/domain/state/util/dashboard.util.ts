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

export function getTasksDueInNext7Days(tasks: Task[]): Task[] {
  const start = new Date();

  const end = new Date();
  end.setDate(start.getDate() + 7);

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
