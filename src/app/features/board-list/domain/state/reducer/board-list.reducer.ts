import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/board-list.actions';
import { BoardListState } from '../state/board-list.state';

export const boardListInitialState: BoardListState = {
  boards: null,
  loading: null,
};

const boardListReducer = createReducer(
  boardListInitialState,
  on(fromActions.BoardListViewActions.viewInitialised, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(
    fromActions.BoardListViewActions.viewInitialisedSucceeded,
    (state, action) => {
      return {
        ...state,
        boards: action.boards,
        loading: false,
      };
    }
  ),
  on(fromActions.BoardListViewActions.removeBoardSucceeded, (state, action) => {
    return {
      ...state,
      boards: action.boardsUpdatedList,
    };
  })
);

export function boardListReducerFunction(
  state: BoardListState,
  action: Action
) {
  return boardListReducer(state, action);
}
