import { Action, createReducer, on } from '@ngrx/store';
import { DashboardState } from '../state/dashboard.state';
import * as fromActions from '../actions/dashboard.actions';

export const dashboardInitialState: DashboardState = {
  user: null,
  tasksData: null,
};

const dashboardReducer = createReducer(
  dashboardInitialState,
  on(
    fromActions.DashboardViewActions.viewInitialisedSucceeded,
    (state, action) => {
      return {
        ...state,
        user: action.currentUser,
        tasksData: action.tasksData,
      };
    }
  ),
  on(fromActions.DashboardTaskActions.taskEditSucceeded, (state, action) => {
    return {
      ...state,
      tasksData: action.tasksData,
    };
  })
);

export function dashboardReducerFunction(
  state: DashboardState,
  action: Action
) {
  return dashboardReducer(state, action);
}
