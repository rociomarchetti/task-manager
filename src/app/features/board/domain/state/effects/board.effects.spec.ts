import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  Board,
  NewBoardData,
  NewTaskData,
  Task,
  User,
  UserBoardsSummary,
  UserTasksSummary,
} from '@shared/models';
import { BoardsServiceMock } from 'app/core/services/boards-service/__mocks__/boards-service.mock';
import { BoardsService } from 'app/core/services/boards-service/boards-service';
import { TasksServiceMock } from 'app/core/services/tasks-service/__mocks__/tasks-service.mock';
import { TasksService } from 'app/core/services/tasks-service/tasks-service';
import { of, throwError } from 'rxjs';
import * as fromActions from '../actions/board.actions';
import { BoardEffects } from './board.effects';
import { selectAuthenticatedUser } from 'app/features/auth/domain/state';

describe('GIVEN: Board Effects', () => {
  let effects: BoardEffects;
  let taskService: TasksService;
  let boardsService: BoardsService;
  let actions$: ActionsSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
        BoardEffects,
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
    effects = TestBed.inject(BoardEffects);
    taskService = TestBed.inject(TasksService);
    boardsService = TestBed.inject(BoardsService);
  });

  describe('WHEN: viewInitialised', () => {
    it('THEN: should dispatch on success', () => {
      const store = TestBed.inject<MockStore>(MockStore);
      const mockUser = {} as User;
      const mockBoard = {} as Board;
      const mockTasks = {} as UserTasksSummary;
      const mockBoards = {} as UserBoardsSummary;
      const mockSuccessResponse = {
        currentBoard: mockBoard,
        boards: mockBoards.boards,
        taskLists: mockTasks.tasks,
      };
      const result: Action[] = [];
      const mockBoardId = 'A';
      const action = fromActions.BoardEditViewActions.viewInitialised({
        boardId: mockBoardId,
      });
      const expected =
        fromActions.BoardEditViewActions.viewInitialisedSucceeded(
          mockSuccessResponse
        );

      store.overrideSelector(selectAuthenticatedUser, mockUser);
      store.refreshState();
      jest.spyOn(boardsService, 'getBoardById').mockReturnValue(of(mockBoard));
      jest.spyOn(taskService, 'getTasksForUser').mockReturnValue(of(mockTasks));
      jest
        .spyOn(boardsService, 'getBoardsForUser')
        .mockReturnValue(of(mockBoards));
      effects.viewInitialised$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });

  describe('WHEN: addNewTask', () => {
    const mockUser = {} as User;
    const mockNewTaskData = {} as NewTaskData;
    const action = fromActions.BoardEditActions.addNewTask({
      newTaskData: mockNewTaskData,
    });
    it('THEN: should call the service', () => {
      const store = TestBed.inject<MockStore>(MockStore);
      const result: Action[] = [];
      const spy = jest.spyOn(taskService, 'addTask');

      store.overrideSelector(selectAuthenticatedUser, mockUser);
      effects.addNewTask$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(spy).toHaveBeenCalled();
    });
    it('THEN: should dispatch on success', () => {
      const result: Action[] = [];
      const expected = fromActions.BoardEditActions.addNewTaskSucceeded();
      jest
        .spyOn(taskService, 'addTask')
        .mockImplementation(() => of({} as Task));

      effects.addNewTask$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
    it('THEN: should dispatch on error', () => {
      const result: Action[] = [];
      const expected = fromActions.BoardEditActions.addNewTaskError();
      jest
        .spyOn(taskService, 'addTask')
        .mockImplementation(() => throwError(() => 'error'));

      effects.addNewTask$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });

  describe('WHEN: addNewBoard', () => {
    const mockNewBoardData = {} as NewBoardData;
    const action = fromActions.BoardCreateActions.addNewBoard({
      newBoardData: mockNewBoardData,
    });

    it('THEN: should call the service', () => {
      const result: Action[] = [];
      const spy = jest.spyOn(boardsService, 'createNewBoard');

      effects.addNewBoard$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(spy).toHaveBeenCalled();
    });
    it('THEN: should dispatch on success', () => {
      const result: Action[] = [];
      const expected = fromActions.BoardCreateActions.addNewBoardSucceeded();
      jest
        .spyOn(boardsService, 'createNewBoard')
        .mockImplementation(() => of({} as Board));

      effects.addNewBoard$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
    it('THEN: should dispatch on error', () => {
      const result: Action[] = [];
      const expected = fromActions.BoardCreateActions.addNewBoardError();
      jest
        .spyOn(boardsService, 'createNewBoard')
        .mockImplementation(() => throwError(() => 'error'));

      effects.addNewBoard$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });

  describe('WHEN: updateBoard', () => {
    const mockUpdatedBoard = {} as Board;
    const action = fromActions.BoardEditActions.editBoard({
      updatedBoard: mockUpdatedBoard,
    });

    it('THEN: should call the service', () => {
      const result: Action[] = [];
      const spy = jest.spyOn(boardsService, 'updateBoard');

      effects.updateBoard$.subscribe((res) => result.push(res));
      actions$.next(action);

      expect(spy).toHaveBeenCalled();
    });

    it('THEN: should dispatch on success', () => {
      const result: Action[] = [];
      const mockEditedBoard = {} as Board;
      const expected = fromActions.BoardEditActions.editBoardSucceeded({
        updatedBoard: mockEditedBoard,
      });
      jest
        .spyOn(boardsService, 'updateBoard')
        .mockImplementation(() => of(mockEditedBoard));

      effects.updateBoard$.subscribe((res) => result.push(res));
      actions$.next(action);

      expect(result).toEqual([expected]);
    });

    it('THEN: should dispatch on error', () => {
      const result: Action[] = [];
      const expected = fromActions.BoardEditActions.editBoardError();
      jest
        .spyOn(boardsService, 'updateBoard')
        .mockImplementation(() => throwError(() => 'error'));

      effects.updateBoard$.subscribe((res) => result.push(res));
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });
});
