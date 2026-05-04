import { Action, createReducer, on } from '@ngrx/store';
import { DashboardState } from '../state/dashboard.state';
import * as fromActions from '../actions/dashboard.actions';

export const dashboardInitialState: DashboardState = {
  user: null,
  tasksData: null,
  boardsData: null,
  loading: null,
};

const dashboardReducer = createReducer(
  dashboardInitialState,
  on(fromActions.DashboardViewActions.viewInitialised, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(
    fromActions.DashboardViewActions.viewInitialisedSucceeded,
    (state, action) => {
      return {
        ...state,
        user: action.currentUser,
        tasksData: action.tasksData,
        boardsData: action.boardsData,
        loading: false,
      };
    }
  ),
  on(
    fromActions.DashboardTaskActions.updatedTasksSucceeded,
    (state, action) => {
      return {
        ...state,
        tasksData: action.tasksData,
      };
    }
  ),
  on(
    fromActions.DashboardBoardActions.removeBoardSucceeded,
    (state, { boardsUpdatedList }) => ({
      ...state,
      boardsData: state.boardsData
        ? {
            ...state.boardsData,
            boards: boardsUpdatedList,
          }
        : null,
    })
  )
);

export function dashboardReducerFunction(
  state: DashboardState,
  action: Action
) {
  return dashboardReducer(state, action);
}
