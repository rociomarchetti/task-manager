import { DashboardViewModel } from './../../entities/dashboard-view.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState, dashboardFeatureKey } from '../state/dashboard.state';
import {
  countTasksByStatus,
  getRecentlyStatusChangedTasks,
  getRecentlyCreatedTasks,
  getTasksDueInNext7Days,
  getCurrentBoards,
} from '../util/dashboard.util';

export const selectDashboardState =
  createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectDashboardViewModel = createSelector(
  selectDashboardState,
  (state): DashboardViewModel => ({
    currentBoards: getCurrentBoards(state?.boardsData?.boards),
    recentlyCreatedTasks: getRecentlyCreatedTasks(state?.tasksData?.tasks),
    recentlyUpdatedTasks: getRecentlyStatusChangedTasks(
      state?.tasksData?.tasks
    ),
    userName: state?.user?.name,
    tasksAmounts: countTasksByStatus(state?.tasksData?.tasks),
    tasksDueSoon: getTasksDueInNext7Days(state?.tasksData?.tasks),
  })
);
