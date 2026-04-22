import { Board } from '@shared/models';
import * as fromSelectors from '../selectors/board-list.selectors';
import { BoardListState } from '../state/board-list.state';
import { BoardListViewModel } from '../../entities/board-list-view.model';

describe('GIVEN: Board List Selectors', () => {
  let mockState: BoardListState;

  beforeEach(() => {
    mockState = {
      boards: [{} as Board],
    };
  });

  describe('WHEN: view is initialised', () => {
    it('THEN: should return the view model', () => {
      const expected: BoardListViewModel = {
        boards: mockState.boards ?? [],
      };
      const result =
        fromSelectors.selectBoardListViewModel.projector(mockState);

      expect(result).toEqual(expected);
    });
  });
});
