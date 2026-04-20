import {
  NewTaskData,
  Task,
  TaskStatus,
  UserTasksSummary,
} from '@shared/models';
import { firstValueFrom } from 'rxjs';
import { TasksService } from './tasks-service';

describe('GIVEN: TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    jest.spyOn(localStorage.__proto__, 'getItem');
    jest.spyOn(localStorage.__proto__, 'setItem');

    service = new TasksService();
  });

  describe('WHEN: getTasksForUser', () => {
    it('THEN: should retrieve all tasks for the given user', async () => {
      const responseMock: UserTasksSummary = {
        userId: 1,
        tasks: [{} as Task],
      };
      const result = await firstValueFrom(
        service.getTasksForUser(responseMock.userId)
      );

      expect(result.userId).toBe(responseMock.userId);
      expect(
        result.tasks.every((task) => task.userId === responseMock.userId)
      ).toBe(true);
    });

    it('THEN: should retrieve empty array if user has no tasks', async () => {
      const mockNoTasksUserId = 999;
      const result = await firstValueFrom(
        service.getTasksForUser(mockNoTasksUserId)
      );

      expect(result.tasks).toEqual([]);
    });
  });
  describe('WHEN: getTasksByBoardId', () => {
    it('THEN: should retrieve tasks for the selected board', async () => {
      const mockBoardId = 'A';
      const result = await firstValueFrom(
        service.getTasksByBoardId(mockBoardId)
      );

      expect(result.every((task) => task.boardId === mockBoardId)).toBe(true);
    });

    it('THEN: should retrieve empty array if board has no tasks', async () => {
      const noBoardId = 'ZZZ';
      const result = await firstValueFrom(service.getTasksByBoardId(noBoardId));

      expect(result).toEqual([]);
    });
  });
  describe('WHEN: addTask', () => {
    const newTaskMock: NewTaskData = {
      title: 'New task',
      description: 'Task desc',
      boardId: 'A',
      dueDate: new Date(),
      status: TaskStatus.IN_PROGRESS,
    };

    it('THEN: should add a new task', async () => {
      const mockNewId = 1;
      const result = await firstValueFrom(
        service.addTask(newTaskMock, mockNewId)
      );

      expect(result.title).toBe(newTaskMock.title);
      expect(result.userId).toBe(mockNewId);
      expect(result.id).toBeDefined();
    });

    it('THEN: should save tasks in local storage', async () => {
      await firstValueFrom(service.addTask(newTaskMock, 1));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'fake_tasks',
        expect.any(String)
      );
    });
  });
  describe('WHEN: markTaskAsDone', () => {
    it('THEN: should mark task as done', async () => {
      const mockTaskId = '1';
      const result = await firstValueFrom(service.markTaskAsDone(mockTaskId));

      expect(result?.status).toBe(TaskStatus.DONE);
    });

    it('THEN: should retrieve null if task does not exist', async () => {
      const mockNoTaskId = '999';
      const result = await firstValueFrom(service.markTaskAsDone(mockNoTaskId));

      expect(result).toBeNull();
    });

    it('THEN: should save tasks in local storage', async () => {
      const mockTaskId = '1';
      await firstValueFrom(service.markTaskAsDone(mockTaskId));

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
  describe('WHEN: postponeTask', () => {
    it('THEN: should postpone due date', async () => {
      const mockTaskId = '1';
      const mockAmountOfDays = 3;
      const result = await firstValueFrom(
        service.postponeTask(mockTaskId, mockAmountOfDays)
      );

      expect(result?.dueDate).toBeDefined();
    });

    it('THEN: should retrieve null if task does not exist', async () => {
      const mockNoTaskId = '999';
      const mockAmountOfDays = 3;
      const result = await firstValueFrom(
        service.postponeTask(mockNoTaskId, mockAmountOfDays)
      );

      expect(result).toBeNull();
    });
  });
  describe('WHEN: updateTask', () => {
    it('THEN: should update task data', async () => {
      const task = (await firstValueFrom(service.getTasksByBoardId('A')))[0];

      const updatedTask = {
        ...task,
        title: 'Updated task',
      };

      const result = await firstValueFrom(service.updateTask(updatedTask));

      expect(result?.title).toBe('Updated task');
    });

    it('THEN: should retrieve null if task does not exist', async () => {
      const mockTask: Task = {} as Task;
      const result = await firstValueFrom(service.updateTask(mockTask));

      expect(result).toBeNull();
    });

    it('THEN: should save tasks in local storage', async () => {
      const mockBoardId = 'A';
      const task = (
        await firstValueFrom(service.getTasksByBoardId(mockBoardId))
      )[0];

      await firstValueFrom(service.updateTask(task));

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
  describe('WHEN: removeTask', () => {
    it('THEN: should remove task', async () => {
      const mockTaskId = '1';
      const mockUserId = 1;
      await firstValueFrom(service.removeTask(mockTaskId));

      const tasks = await firstValueFrom(service.getTasksForUser(mockUserId));

      expect(
        tasks.tasks.find((task) => task.id === mockTaskId)
      ).toBeUndefined();
    });

    it('THEN: should save tasks in local storage', async () => {
      const mockTaskId = '1';
      await firstValueFrom(service.removeTask(mockTaskId));

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});
