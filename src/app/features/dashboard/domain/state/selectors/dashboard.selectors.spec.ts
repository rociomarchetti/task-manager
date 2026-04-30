import {
  Board,
  Task,
  TaskAmounts,
  User,
  UserBoardsSummary,
  UserTasksSummary,
} from '@shared/models';
import { DashboardState } from '../state/dashboard.state';
import * as fromSelectors from './dashboard.selectors';
import { DashboardViewModel } from '../../entities/dashboard-view.model';

describe('GIVEN: Dashboard Selectors', () => {
  let mockState: DashboardState;

  beforeEach(() => {
    mockState = {
      user: {} as User,
      tasksData: {} as UserTasksSummary,
      boardsData: {} as UserBoardsSummary,
    };
  });

  describe('WHEN: view is initialised', () => {
    it('THEN: should return the view model', () => {
      const expected: DashboardViewModel = {
        currentBoards: [],
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
