import { Board, Task } from '@shared/models';
import { BoardState } from '../state/board.state';
import { BoardViewModel } from '../../entities/board-view.model';
import * as fromSelectors from '../selectors/board.selectors';
import { tasksByStatus } from '../../util/board.util';

describe('GIVEN: Board Selectors', () => {
  let mockState: BoardState;

  beforeEach(() => {
    mockState = {
      currentBoard: {} as Board,
      boards: [{} as Board],
      taskLists: [{} as Task],
    };
  });

  describe('WHEN: view is initialised', () => {
    it('THEN: should return the view model', () => {
      const expected: BoardViewModel = {
        boards: mockState.boards,
        currentBoard: mockState.currentBoard,
        taskLists: tasksByStatus(mockState.taskLists ?? [], 'boardId'),
      };
      const result = fromSelectors.selectBoardViewModel.projector(mockState);

      expect(result).toEqual(expected);
    });
  });
});
