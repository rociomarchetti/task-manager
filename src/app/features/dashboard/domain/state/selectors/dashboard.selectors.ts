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
  (state): DashboardViewModel => {
    const tasks = state?.tasksData?.tasks ?? [];
    const tasksDueSoon = getTasksDueInNext7Days(tasks);
    const usedIds = new Set(tasksDueSoon.map((t) => t.id));
    const recentlyUpdatedTasks = getRecentlyStatusChangedTasks(
      tasks.filter((t) => !usedIds.has(t.id))
    );

    recentlyUpdatedTasks.forEach((t) => usedIds.add(t.id));

    const recentlyCreatedTasks = getRecentlyCreatedTasks(
      tasks.filter((t) => !usedIds.has(t.id))
    );

    return {
      currentBoards: getCurrentBoards(state?.boardsData?.boards ?? []),
      recentlyCreatedTasks,
      recentlyUpdatedTasks,
      userName: state?.user?.name ?? '',
      tasksAmounts: countTasksByStatus(tasks),
      tasksDueSoon,
    };
  }
);
