import { BoardViewModel } from '../../entities/board-view.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { boardFeatureKey, BoardState } from '../state/board.state';
import { tasksByStatus } from '../../util/board.util';

export const selectBoardState =
  createFeatureSelector<BoardState>(boardFeatureKey);

export const selectBoardViewModel = createSelector(
  selectBoardState,
  (state): BoardViewModel => {
    const currentBoard = state?.currentBoard;

    return {
      boards: state?.boards ?? null,
      currentBoard,
      taskLists: currentBoard
        ? tasksByStatus(state?.taskLists ?? [], currentBoard.id)
        : null,
    };
  }
);
