import { BoardListViewModel } from './../../entities/board-list-view.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { boardListFeatureKey, BoardListState } from '../state/board-list.state';

export const selectBoardListState =
  createFeatureSelector<BoardListState>(boardListFeatureKey);

export const selectBoardListViewModel = createSelector(
  selectBoardListState,
  (state): BoardListViewModel => ({
    boards: state?.boards,
  })
);
