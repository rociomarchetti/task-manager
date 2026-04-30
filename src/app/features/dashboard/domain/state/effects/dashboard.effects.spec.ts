import { TasksService } from 'app/core/services/tasks-service/tasks-service';
import { DashboardEffects } from './dashboard.effects';
import { BoardsService } from 'app/core/services/boards-service/boards-service';
import { Action, ActionsSubject } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideZoneChangeDetection } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { BoardsServiceMock } from 'app/core/services/boards-service/__mocks__/boards-service.mock';
import { TasksServiceMock } from 'app/core/services/tasks-service/__mocks__/tasks-service.mock';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import {
  Board,
  Task,
  User,
  UserBoardsSummary,
  UserTasksSummary,
} from '@shared/models';
import * as fromActions from '../actions/dashboard.actions';
import { selectAuthenticatedUser } from 'app/features/auth/domain/state';

describe('GIVEN: Dashboard Effects', () => {
  let effects: DashboardEffects;
  let taskService: TasksService;
  let boardsService: BoardsService;
  let actions$: ActionsSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
        DashboardEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: BoardsService, useClass: BoardsServiceMock },
        { provide: TasksService, useClass: TasksServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(''),
          },
        },
      ],
    });
  });

  beforeEach(() => {
    actions$ = new ActionsSubject();
    effects = TestBed.inject(DashboardEffects);
    taskService = TestBed.inject(TasksService);
    boardsService = TestBed.inject(BoardsService);
  });

  describe('WHEN: viewInitialised', () => {
    it('THEN: should dispatch on success', () => {
      const mockUser = {} as User;
      const mockTasksData = {} as UserTasksSummary;
      const mockBoardsData = {} as UserBoardsSummary;
      const result: Action[] = [];
      const store = TestBed.inject<MockStore>(MockStore);
      const action = fromActions.DashboardViewActions.viewInitialised();
      const expected =
        fromActions.DashboardViewActions.viewInitialisedSucceeded({
          currentUser: mockUser,
          tasksData: mockTasksData,
          boardsData: mockBoardsData,
        });

      store.overrideSelector(selectAuthenticatedUser, mockUser);
      store.refreshState();
      effects.viewInitialised$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });

  describe('WHEN: postponedTask', () => {
    const mockTaskId = 'task-123';
    it('THEN: should dispatch postponedTaskSucceeded on success', (done) => {
      const action = fromActions.DashboardTaskActions.postponedTask({
        taskId: mockTaskId,
      });
      const expected =
        fromActions.DashboardTaskActions.postponedTaskSucceeded();

      effects.postponedTask$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });

    it('THEN: should dispatch editTaskError on failure', (done) => {
      const action = fromActions.DashboardTaskActions.postponedTask({
        taskId: mockTaskId,
      });
      const expected = fromActions.DashboardTaskActions.editTaskError();
      jest
        .spyOn(taskService, 'postponeTask')
        .mockReturnValue(throwError(() => new Error('error')));

      effects.postponedTask$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });
  });

  describe('WHEN: completedTask', () => {
    const mockTaskId = 'task-123';
    it('THEN: should dispatch completedTaskSucceeded on success', (done) => {
      const action = fromActions.DashboardTaskActions.completedTask({
        taskId: mockTaskId,
      });
      const expected =
        fromActions.DashboardTaskActions.completedTaskSucceeded();

      effects.completedTask$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });

    it('THEN: should dispatch editTaskError on failure', (done) => {
      jest
        .spyOn(taskService, 'markTaskAsDone')
        .mockReturnValue(throwError(() => new Error('error')));

      const action = fromActions.DashboardTaskActions.completedTask({
        taskId: mockTaskId,
      });
      const expected = fromActions.DashboardTaskActions.editTaskError();

      effects.completedTask$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });
  });

  describe('WHEN: updatedTask', () => {
    const mockTask = {} as Task;
    it('THEN: should dispatch editTaskSucceeded on success', (done) => {
      const action = fromActions.DashboardTaskActions.editTask({
        updatedTask: mockTask,
      });
      const expected = fromActions.DashboardTaskActions.editTaskSucceeded();

      effects.updatedTask$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });

    it('THEN: should dispatch editTaskError on failure', (done) => {
      const action = fromActions.DashboardTaskActions.editTask({
        updatedTask: mockTask,
      });
      const expected = fromActions.DashboardTaskActions.editTaskError();
      jest
        .spyOn(taskService, 'updateTask')
        .mockReturnValue(throwError(() => new Error('error')));

      effects.updatedTask$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });
  });

  describe('WHEN: createNewTaskClicked', () => {
    let store: MockStore;
    const mockUser = {} as User;

    beforeEach(() => {
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectAuthenticatedUser, mockUser);
      store.refreshState();
    });

    it('THEN: should dispatch createNewTaskSucceeded on success', (done) => {
      const action = fromActions.DashboardTaskActions.createNewTaskClicked({
        newTask: {} as Task,
      });
      const expected =
        fromActions.DashboardTaskActions.createNewTaskSucceeded();

      effects.createNewTask.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });

    it('THEN: should dispatch createNewTaskError on failure', (done) => {
      const action = fromActions.DashboardTaskActions.createNewTaskClicked({
        newTask: {} as Task,
      });
      const expected = fromActions.DashboardTaskActions.createNewTaskError();
      jest
        .spyOn(taskService, 'addTask')
        .mockReturnValue(throwError(() => new Error('error')));

      effects.createNewTask.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });
  });

  describe('WHEN: removeBoardClicked', () => {
    const mockBoard = 'board-123';

    it('THEN: should dispatch removeBoardSucceeded on success', (done) => {
      const mockBoards = [{} as Board];
      const action = fromActions.DashboardBoardActions.removeBoardClicked({
        boardId: mockBoard,
      });
      const expected = fromActions.DashboardBoardActions.removeBoardSucceeded({
        boardsUpdatedList: mockBoards,
      });

      jest.spyOn(boardsService, 'deleteBoard').mockReturnValue(of(mockBoards));
      effects.onRemoveBoard$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });

    it('THEN: should dispatch removeBoardError on failure', (done) => {
      const action = fromActions.DashboardBoardActions.removeBoardClicked({
        boardId: mockBoard,
      });
      const expected = fromActions.DashboardBoardActions.removeBoardError();
      jest
        .spyOn(boardsService, 'deleteBoard')
        .mockReturnValue(throwError(() => new Error('error')));

      effects.onRemoveBoard$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });
  });

  describe('WHEN: removeTaskClicked', () => {
    const mockTaskId = 'task-123';
    it('THEN: should dispatch removeTaskSucceeded on success', (done) => {
      const action = fromActions.DashboardTaskActions.removeTaskClicked({
        taskId: mockTaskId,
      });
      const expected = fromActions.DashboardTaskActions.removeTaskSucceeded();

      effects.onRemoveTask$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });

    it('THEN: should dispatch removeTaskError on failure', (done) => {
      const action = fromActions.DashboardTaskActions.removeTaskClicked({
        taskId: mockTaskId,
      });
      const expected = fromActions.DashboardTaskActions.removeTaskError();
      jest
        .spyOn(taskService, 'removeTask')
        .mockReturnValue(throwError(() => new Error('error')));

      effects.onRemoveTask$.subscribe((res) => {
        expect(res).toEqual(expected);
        done();
      });

      actions$.next(action);
    });
  });
});
