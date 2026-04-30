import { Task, TaskStatus } from '@shared/models';
import { TaskListsData } from '../entities/board.model';

export const tasksByStatus = (tasks: Task[], boardId: string) => {
  const boardTasks = tasks?.filter((t) => t.boardId === boardId);

  return {
    pending: boardTasks?.filter((t) => t.status === TaskStatus.PENDING),
    inProgress: boardTasks?.filter((t) => t.status === TaskStatus.IN_PROGRESS),
    completed: boardTasks?.filter((t) => t.status === TaskStatus.DONE),
  };
};

export function checkTaskListsChanges(
  initial: TaskListsData,
  todo: string[],
  inProgress: string[],
  done: string[]
): boolean {
  const todoChanged =
    JSON.stringify(todo) !==
    JSON.stringify(initial.pending.map((t) => t.title));
  const inProgressChanged =
    JSON.stringify(inProgress) !==
    JSON.stringify(initial.inProgress.map((t) => t.title));
  const doneChanged =
    JSON.stringify(done) !==
    JSON.stringify(initial.completed.map((t) => t.title));

  return todoChanged || inProgressChanged || doneChanged;
}

export function updateTaskLists(
  original: TaskListsData,
  todo: string[],
  wip: string[],
  done: string[]
): TaskListsData {
  const findTask = (title: string): Task | undefined =>
    original.pending.find((t) => t.title === title) ||
    original.inProgress.find((t) => t.title === title) ||
    original.completed.find((t) => t.title === title);

  const pending: Task[] = todo
    .map((title) => {
      const task = findTask(title);
      return task ? { ...task, status: TaskStatus.PENDING } : null;
    })
    .filter(Boolean) as Task[];

  const inProgress: Task[] = wip
    .map((title) => {
      const task = findTask(title);
      return task ? { ...task, status: TaskStatus.IN_PROGRESS } : null;
    })
    .filter(Boolean) as Task[];

  const completed: Task[] = done
    .map((title) => {
      const task = findTask(title);
      return task ? { ...task, status: TaskStatus.DONE } : null;
    })
    .filter(Boolean) as Task[];

  return {
    pending,
    inProgress,
    completed,
  };
}
