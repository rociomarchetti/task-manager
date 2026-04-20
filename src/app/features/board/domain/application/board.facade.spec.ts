import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromActions from '../state/actions/board.actions';
import { BoardFacade } from './board.facade';
import { Board, NewTaskData } from '@shared/models';

describe('GIVEN: Board Facade', () => {
  let store: MockStore;
  let facade: BoardFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardFacade,
        provideMockStore(),
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    facade = TestBed.inject(BoardFacade);
  });

  describe('WHEN: viewInitialised', () => {
    it('THEN: should dispatch viewInitialised action', () => {
      const mockBoardId = 'A';
      const action = fromActions.BoardEditViewActions.viewInitialised({
        boardId: mockBoardId,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.viewInitialised(mockBoardId);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: addNewTask', () => {
    it('THEN: should dispatch addNewTask action', () => {
      const mockNewTaskData = {} as NewTaskData;
      const action = fromActions.BoardEditActions.addNewTask({
        newTaskData: mockNewTaskData,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.addNewTask(mockNewTaskData);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: editBoard', () => {
    it('THEN: should dispatch editBoard action', () => {
      const mockBoard = {} as Board;
      const action = fromActions.BoardEditActions.editBoard({
        updatedBoard: mockBoard,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.editBoard(mockBoard);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: addNewBoard', () => {
    it('THEN: should dispatch addNewBoard action', () => {
      const mockBoard = {} as Board;
      const action = fromActions.BoardCreateActions.addNewBoard({
        newBoardData: mockBoard,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.addNewBoard(mockBoard);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: cancelChanges', () => {
    it('THEN: should dispatch cancelChanges action', () => {
      const action = fromActions.BoardEditActions.cancelChanges();
      const result = jest.spyOn(store, 'dispatch');

      facade.cancelChanges();

      expect(result).toHaveBeenCalledWith(action);
    });
  });
});
