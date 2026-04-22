import { User, UserBoardsSummary, UserTasksSummary } from '@shared/models';
import * as fromActions from '../actions/dashboard.actions';
import * as fromReducer from '../reducer/dashboard.reducer';

describe('GIVEN: Dashboard Reducer', () => {
  const { dashboardInitialState } = fromReducer;

  describe('WHEN: viewInitialisedSucceeded', () => {
    it('THEN: should update state', () => {
      const mockUser = {} as User;
      const mockTasks = {} as UserTasksSummary;
      const mockBoards = {} as UserBoardsSummary;
      const action = fromActions.DashboardViewActions.viewInitialisedSucceeded({
        currentUser: mockUser,
        tasksData: mockTasks,
        boardsData: mockBoards,
      });

      const newState = fromReducer.dashboardReducerFunction(
        dashboardInitialState,
        action
      );

      expect(newState.user).toEqual(mockUser);
      expect(newState.tasksData).toEqual(mockTasks);
      expect(newState.boardsData).toEqual(mockBoards);
    });
  });
});
