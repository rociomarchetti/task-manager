import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Board, NewTaskData, Task } from '@shared/models';
import { take } from 'rxjs';
import * as fromActions from '../state/actions/dashboard.actions';
import { DashboardFacade } from './dashboard.facade';

describe('GIVEN: Dashboard Facade', () => {
  let store: MockStore;
  let facade: DashboardFacade;
  let actions$: ActionsSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardFacade,
        provideMockStore(),
        provideMockActions(() => actions$),
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    facade = TestBed.inject(DashboardFacade);
    actions$ = new ActionsSubject();
  });

  describe('WHEN: taskCreatedSuccess$', () => {
    it('THEN: should emit when createNewTaskSucceeded is dispatched', (done) => {
      const action = fromActions.DashboardTaskActions.createNewTaskSucceeded();

      facade.taskCreatedSuccess$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(action);
        done();
      });

      actions$.next(action);
    });

    it('THEN: should not emit for other actions', (done) => {
      const otherAction =
        fromActions.DashboardTaskActions.removeTaskSucceeded();

      let emitted = false;

      facade.taskCreatedSuccess$.subscribe(() => {
        emitted = true;
      });

      actions$.next(otherAction);

      setTimeout(() => {
        expect(emitted).toBe(false);
        done();
      }, 0);
    });
  });

  describe('WHEN: taskRemovedSuccess$', () => {
    it('THEN: should emit when removeTaskSucceeded is dispatched', (done) => {
      const action = fromActions.DashboardTaskActions.removeTaskSucceeded();

      facade.taskRemovedSuccess$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(action);
        done();
      });

      actions$.next(action);
    });
  });

  describe('WHEN: boardRemovedSuccess$', () => {
    it('THEN: should emit when removeBoardSucceeded is dispatched', (done) => {
      const mockBoards = [{} as Board];
      const action = fromActions.DashboardBoardActions.removeBoardSucceeded({
        boardsUpdatedList: mockBoards,
      });

      facade.boardRemovedSuccess$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(action);
        done();
      });

      actions$.next(action);
    });
  });

  describe('WHEN: viewInitialised', () => {
    it('THEN: should dispatch viewInitialised action', () => {
      const action = fromActions.DashboardViewActions.viewInitialised();
      const result = jest.spyOn(store, 'dispatch');

      facade.viewInitialised();

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: markTaskAsDone', () => {
    it('THEN: should dispatch markTaskAsDone action', () => {
      const mockTaskId = 'A';
      const action = fromActions.DashboardTaskActions.completedTask({
        taskId: mockTaskId,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.markTaskAsDone(mockTaskId);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: postponeTask', () => {
    it('THEN: should dispatch postponeTask action', () => {
      const mockTaskId = 'A';
      const action = fromActions.DashboardTaskActions.postponedTask({
        taskId: mockTaskId,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.postponeTask(mockTaskId);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: goToBoard', () => {
    it('THEN: should dispatch goToBoard action', () => {
      const mockBoardId = 'A';
      const action = fromActions.DashboardBoardActions.goToBoardClicked({
        boardId: mockBoardId,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.goToBoard(mockBoardId);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: removeBoard', () => {
    it('THEN: should dispatch removeBoard action', () => {
      const mockBoardId = 'A';
      const action = fromActions.DashboardBoardActions.removeBoardClicked({
        boardId: mockBoardId,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.removeBoard(mockBoardId);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: createNewBoard', () => {
    it('THEN: should dispatch createNewBoard action', () => {
      const action = fromActions.DashboardBoardActions.createNewBoardClicked();
      const result = jest.spyOn(store, 'dispatch');

      facade.createNewBoard();

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: createNewTask', () => {
    it('THEN: should dispatch createNewTask action', () => {
      const mockNewTask = {} as NewTaskData;
      const action = fromActions.DashboardTaskActions.createNewTaskClicked({
        newTask: mockNewTask,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.createNewTask(mockNewTask);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: updateTask', () => {
    it('THEN: should dispatch updateTask action', () => {
      const mockTask = {} as Task;
      const action = fromActions.DashboardTaskActions.editTask({
        updatedTask: mockTask,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.updateTask(mockTask);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: removeTask', () => {
    it('THEN: should dispatch removeTask action', () => {
      const mockTaskId = 'A';
      const action = fromActions.DashboardTaskActions.removeTaskClicked({
        taskId: mockTaskId,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.removeTask(mockTaskId);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: goToBoardsList', () => {
    it('THEN: should dispatch goToBoardsList action', () => {
      const action = fromActions.DashboardBoardActions.goToBoardsListClicked();
      const result = jest.spyOn(store, 'dispatch');

      facade.goToBoardsList();

      expect(result).toHaveBeenCalledWith(action);
    });
  });
});
