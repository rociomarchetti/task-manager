import { Board } from '@shared/models';
import * as fromReducer from '../reducer/board-list.reducer';
import * as fromActions from '../actions/board-list.actions';

describe('GIVEN: Board List Reducer', () => {
  const { boardListInitialState } = fromReducer;

  describe('WHEN: viewInitialisedSucceeded', () => {
    it('THEN: should update state', () => {
      const mockBoards = [{} as Board];
      const action = fromActions.BoardListViewActions.viewInitialisedSucceeded({
        boards: mockBoards,
      });

      const newState = fromReducer.boardListReducerFunction(
        boardListInitialState,
        action
      );

      expect(newState.boards).toEqual(mockBoards);
    });
  });
});
