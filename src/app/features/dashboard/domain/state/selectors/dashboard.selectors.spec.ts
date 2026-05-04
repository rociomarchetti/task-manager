import { User, UserBoardsSummary, UserTasksSummary } from '@shared/models';
import { DashboardViewModel } from '../../entities/dashboard-view.model';
import { DashboardState } from '../state/dashboard.state';
import * as fromSelectors from './dashboard.selectors';

describe('GIVEN: Dashboard Selectors', () => {
  let mockState: DashboardState;

  beforeEach(() => {
    mockState = {
      user: {} as User,
      tasksData: {} as UserTasksSummary,
      boardsData: {} as UserBoardsSummary,
      loading: true,
    };
  });

  describe('WHEN: view is initialised', () => {
    it('THEN: should return the view model', () => {
      const expected: DashboardViewModel = {
        currentBoards: [],
        loading: mockState.loading,
        recentlyCreatedTasks: [],
        recentlyUpdatedTasks: [],
        userName: '',
        tasksAmounts: {
          pending: 0,
          inProgress: 0,
          completed: 0,
        },
        tasksDueSoon: [],
      };
      const result =
        fromSelectors.selectDashboardViewModel.projector(mockState);

      expect(result).toEqual(expected);
    });
  });
});
