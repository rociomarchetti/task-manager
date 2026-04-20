import { TestBed } from '@angular/core/testing';
import { BoardListFacade } from './board-list.facade';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideZoneChangeDetection } from '@angular/core';
import * as fromActions from '../state/actions/board-list.actions';

describe('GIVEN: Board List Facade', () => {
  let store: MockStore;
  let facade: BoardListFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardListFacade,
        provideMockStore(),
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    facade = TestBed.inject(BoardListFacade);
  });

  describe('WHEN: viewInitialised', () => {
    it('THEN: should dispatch viewInitialised action', () => {
      const action = fromActions.BoardListViewActions.viewInitialised();
      const result = jest.spyOn(store, 'dispatch');

      facade.viewInitialised();

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: createNewBoard', () => {
    it('THEN: should dispatch createNewBoard action', () => {
      const action = fromActions.BoardListViewActions.createBoardClicked();
      const result = jest.spyOn(store, 'dispatch');

      facade.createNewBoard();

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: removeBoard', () => {
    it('THEN: should dispatch removeBoard action', () => {
      const mockBoardId = 'A';
      const action = fromActions.BoardListViewActions.removeBoardClicked({
        boardId: mockBoardId,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.removeBoard(mockBoardId);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: goToBoardDetails', () => {
    it('THEN: should dispatch goToBoardDetails action', () => {
      const mockBoardId = 'A';
      const action = fromActions.BoardListViewActions.goToBoardDetailsClicked({
        boardId: mockBoardId,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.goToBoardDetails(mockBoardId);

      expect(result).toHaveBeenCalledWith(action);
    });
  });
});
