import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/board-list.actions';
import { BoardListState } from '../state/board-list.state';

export const boardListInitialState: BoardListState = {
  boards: null,
};

const boardListReducer = createReducer(
  boardListInitialState,
  on(
    fromActions.BoardListViewActions.viewInitialisedSucceeded,
    (state, action) => {
      return {
        ...state,
        boards: action.boards,
      };
    }
  )
);

export function boardListReducerFunction(
  state: BoardListState,
  action: Action
) {
  return boardListReducer(state, action);
}
