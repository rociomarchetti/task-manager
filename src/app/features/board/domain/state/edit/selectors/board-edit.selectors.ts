import { BoardEditViewModel } from './../../../entities/board-edit-view.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { boardEditFeatureKey, BoardState } from '../../state/board.state';
import { tasksByStatus } from '../../../util/board.util';

export const selectEditBoardState =
  createFeatureSelector<BoardState>(boardEditFeatureKey);

export const selectBoardEditViewModel = createSelector(
  selectEditBoardState,
  (state): BoardEditViewModel => ({
    boards: state?.boards ?? null,
    currentBoard: state?.currentBoard ?? null,
    taskLists: tasksByStatus(state?.taskLists ?? []) ?? null,
  })
);
