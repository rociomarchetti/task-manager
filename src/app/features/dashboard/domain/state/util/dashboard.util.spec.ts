import { Task, TaskAmounts, TaskStatus } from '@shared/models';
import {
  countTasksByStatus,
  getRecentlyCreatedTasks,
  getRecentlyStatusChangedTasks,
  getTasksDueInNext7Days,
} from './dashboard.util';

describe('WHEN: Dashboard Utils', () => {
  const now = new Date();
  const tasks = [
    {
      id: '1',
      boardId: 'board-1',
      status: TaskStatus.PENDING,
      createdAt: new Date('2026-01-27T10:00:00Z'),
    },
    {
      id: '2',
      boardId: 'board-1',
      status: TaskStatus.IN_PROGRESS,
      dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      boardId: 'board-1',
      status: TaskStatus.IN_PROGRESS,
      updatedAt: now,
    },
    { id: '4', boardId: 'board-2', status: TaskStatus.PENDING },
  ] as Task[];

  describe('WHEN: countTasksByStatus util', () => {
    it('THEN: should return the count of tasks by status', () => {
      const result = countTasksByStatus(tasks);
      const expected: TaskAmounts = {
        pending: 2,
        inProgress: 2,
        completed: 0,
      };

      expect(result.pending).toEqual(expected.pending);
      expect(result.inProgress).toEqual(expected.inProgress);
      expect(result.completed).toEqual(expected.completed);
    });
  });

  describe('WHEN: getRecentlyCreatedTasks util', () => {
    it('THEN: should return recently created tasks', () => {
      const result = getRecentlyCreatedTasks(tasks);
      const expected = [
        {
          id: '1',
          boardId: 'board-1',
          status: TaskStatus.PENDING,
          createdAt: new Date('2026-01-27T10:00:00Z'),
        },
      ];

      expect(result[0]).toEqual(expected[0]);
    });
  });

  describe('WHEN: getTasksDueInNext7Days util', () => {
    it('THEN: should return tasks due soon', () => {
      const result = getTasksDueInNext7Days(tasks);
      const expected = [
        {
          id: '2',
          boardId: 'board-1',
          status: TaskStatus.IN_PROGRESS,
          dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
        },
      ];

      expect(result[0]).toEqual(expected[0]);
    });
  });

  describe('WHEN: getRecentlyStatusChangedTasks util', () => {
    it('THEN: should return tasks recently updated', () => {
      const result = getRecentlyStatusChangedTasks(tasks);
      const expected = [
        {
          id: '3',
          boardId: 'board-1',
          status: TaskStatus.IN_PROGRESS,
          updatedAt: now,
        },
      ];

      expect(result[0]).toEqual(expected[0]);
    });
  });
});
