import { Action, createReducer, on } from '@ngrx/store';
import { BoardState } from '../../state/board.state';
import * as fromActions from '../actions/board-edit.actions';

export const boardEditInitialState: BoardState = {
  currentBoard: null,
  boards: null,
  taskLists: null,
};

const boardEditReducer = createReducer(
  boardEditInitialState,
  on(
    fromActions.BoardEditViewActions.viewInitialisedSucceeded,
    (state, action) => {
      return {
        ...state,
        currentBoard: action.currentBoard,
        boards: action.boards,
        taskLists: action.taskLists,
      };
    }
  ),
  on(fromActions.BoardEditActions.updatedTasksSucceeded, (state, action) => {
    return {
      ...state,
      tasksData: action.tasksData,
    };
  }),
  on(fromActions.BoardEditActions.editBoardSucceeded, (state, action) => {
    return {
      ...state,
      currentBoard: action.updatedBoard,
    };
  })
);

export function boardEditReducerFunction(state: BoardState, action: Action) {
  return boardEditReducer(state, action);
}
