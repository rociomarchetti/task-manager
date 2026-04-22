import { Action, createReducer, on } from '@ngrx/store';
import { BoardState } from '../state/board.state';
import * as fromActions from '../actions/board.actions';

export const boardInitialState: BoardState = {
  currentBoard: null,
  boards: null,
  taskLists: null,
};

const boardReducer = createReducer(
  boardInitialState,
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
      taskLists: action.tasksData.tasks,
    };
  }),
  on(fromActions.BoardEditActions.editBoardSucceeded, (state, action) => {
    return {
      ...state,
      currentBoard: action.updatedBoard,
    };
  })
);

export function boardReducerFunction(state: BoardState, action: Action) {
  return boardReducer(state, action);
}
