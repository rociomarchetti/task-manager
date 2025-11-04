import {
  Task,
  TaskStatus,
} from 'app/features/dashboard/domain/entities/dashboard.model';

export const mockTasks: Task[] = [
  {
    id: 't1',
    userId: 1,
    title: 'Add dashboard scaffolding',
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date(),
  },
  {
    id: 't2',
    userId: 1,
    title: 'Create dashboard panel UI component',
    status: TaskStatus.PENDING,
  },
  {
    id: 't3',
    userId: 1,
    title: 'Check dashboard service doc',
    status: TaskStatus.DONE,
  },
];
