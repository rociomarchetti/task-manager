import { Task, TaskStatus } from '@shared/models';
import {
  checkTaskListsChanges,
  tasksByStatus,
  updateTaskLists,
} from './board.util';
import { TaskListsData } from '../entities/board.model';

describe('GIVEN: Board Utils', () => {
  describe('WHEN: tasksByStatus util', () => {
    const boardId = 'board-1';

    const tasks = [
      { id: '1', boardId: 'board-1', status: TaskStatus.PENDING },
      { id: '2', boardId: 'board-1', status: TaskStatus.IN_PROGRESS },
      { id: '3', boardId: 'board-1', status: TaskStatus.DONE },
      { id: '4', boardId: 'board-2', status: TaskStatus.PENDING },
    ] as Task[];

    describe('WHEN: filtering tasks by boardId', () => {
      it('THEN: should return only tasks from the given board grouped by status', () => {
        const result = tasksByStatus(tasks, boardId);

        expect(result.pending).toHaveLength(1);
        expect(result.inProgress).toHaveLength(1);
        expect(result.completed).toHaveLength(1);

        expect(result.pending[0].id).toBe('1');
        expect(result.inProgress[0].id).toBe('2');
        expect(result.completed[0].id).toBe('3');
      });
    });

    describe('WHEN: no tasks match the boardId', () => {
      it('THEN: should return empty arrays for all statuses', () => {
        const result = tasksByStatus(tasks, 'unknown-board');

        expect(result.pending).toEqual([]);
        expect(result.inProgress).toEqual([]);
        expect(result.completed).toEqual([]);
      });
    });

    describe('WHEN: tasks is undefined', () => {
      it('THEN: should return undefined arrays', () => {
        const result = tasksByStatus(undefined as any, boardId);

        expect(result.pending).toBeUndefined();
        expect(result.inProgress).toBeUndefined();
        expect(result.completed).toBeUndefined();
      });
    });

    describe('WHEN: tasks is empty', () => {
      it('THEN: should return empty arrays', () => {
        const result = tasksByStatus([], boardId);

        expect(result.pending).toEqual([]);
        expect(result.inProgress).toEqual([]);
        expect(result.completed).toEqual([]);
      });
    });
  });

  describe('WHEN: checkTaskListsChanges util', () => {
    const initial = {
      pending: [{ title: 'task 1' }, { title: 'task 2' }],
      inProgress: [{ title: 'task 3' }],
      completed: [{ title: 'task 4' }],
    } as TaskListsData;

    describe('WHEN: lists have not changed', () => {
      it('THEN: should return false', () => {
        const result = checkTaskListsChanges(
          initial,
          ['task 1', 'task 2'],
          ['task 3'],
          ['task 4']
        );

        expect(result).toBe(false);
      });
    });

    describe('WHEN: pending list changes', () => {
      it('THEN: should return true', () => {
        const result = checkTaskListsChanges(
          initial,
          ['task 1'],
          ['task 3'],
          ['task 4']
        );

        expect(result).toBe(true);
      });
    });

    describe('WHEN: inProgress list changes', () => {
      it('THEN: should return true', () => {
        const result = checkTaskListsChanges(
          initial,
          ['task 1', 'task 2'],
          ['task X'],
          ['task 4']
        );

        expect(result).toBe(true);
      });
    });

    describe('WHEN: completed list changes', () => {
      it('THEN: should return true', () => {
        const result = checkTaskListsChanges(
          initial,
          ['task 1', 'task 2'],
          ['task 3'],
          ['task X']
        );

        expect(result).toBe(true);
      });
    });

    describe('WHEN: order changes but content is the same', () => {
      it('THEN: should return true (order matters)', () => {
        const result = checkTaskListsChanges(
          initial,
          ['task 2', 'task 1'],
          ['task 3'],
          ['task 4']
        );

        expect(result).toBe(true);
      });
    });

    describe('WHEN: extra item is added', () => {
      it('THEN: should return true', () => {
        const result = checkTaskListsChanges(
          initial,
          ['task 1', 'task 2', 'task 5'],
          ['task 3'],
          ['task 4']
        );

        expect(result).toBe(true);
      });
    });

    describe('WHEN: item is removed', () => {
      it('THEN: should return true', () => {
        const result = checkTaskListsChanges(
          initial,
          ['task 1'],
          ['task 3'],
          ['task 4']
        );

        expect(result).toBe(true);
      });
    });
  });

  describe('GIVEN: updateTaskLists util', () => {
    const original = {
      pending: [{ id: '1', title: 'task 1', status: TaskStatus.PENDING }],
      inProgress: [
        { id: '2', title: 'task 2', status: TaskStatus.IN_PROGRESS },
      ],
      completed: [{ id: '3', title: 'task 3', status: TaskStatus.DONE }],
    } as TaskListsData;

    describe('WHEN: tasks are reordered across lists', () => {
      it('THEN: should move tasks and update their status', () => {
        const result = updateTaskLists(
          original,
          ['task 2'],
          ['task 3'],
          ['task 1']
        );

        expect(result.pending[0].title).toBe('task 2');
        expect(result.pending[0].status).toBe(TaskStatus.PENDING);

        expect(result.inProgress[0].title).toBe('task 3');
        expect(result.inProgress[0].status).toBe(TaskStatus.IN_PROGRESS);

        expect(result.completed[0].title).toBe('task 1');
        expect(result.completed[0].status).toBe(TaskStatus.DONE);
      });
    });

    describe('WHEN: order of input arrays changes', () => {
      it('THEN: should preserve the new order', () => {
        const result = updateTaskLists(
          original,
          ['task 1'],
          [],
          ['task 3', 'task 2']
        );

        expect(result.completed.map((t: any) => t.title)).toEqual([
          'task 3',
          'task 2',
        ]);
      });
    });

    describe('WHEN: task does not exist in original', () => {
      it('THEN: should ignore it', () => {
        const result = updateTaskLists(original, ['task X'], [], []);

        expect(result.pending).toEqual([]);
      });
    });

    describe('WHEN: updating tasks', () => {
      it('THEN: should keep other properties intact', () => {
        const result = updateTaskLists(original, ['task 1'], [], []);

        expect(result.pending[0]).toMatchObject({
          id: '1',
          title: 'task 1',
          status: TaskStatus.PENDING,
        });
      });
    });

    describe('WHEN: function is executed', () => {
      it('THEN: should not mutate original object', () => {
        const copy = JSON.parse(JSON.stringify(original));

        updateTaskLists(original, ['task 2'], [], []);

        expect(original).toEqual(copy);
      });
    });

    describe('WHEN: lists are empty', () => {
      it('THEN: should return empty lists', () => {
        const result = updateTaskLists(original, [], [], []);

        expect(result.pending).toEqual([]);
        expect(result.inProgress).toEqual([]);
        expect(result.completed).toEqual([]);
      });
    });
  });
});
