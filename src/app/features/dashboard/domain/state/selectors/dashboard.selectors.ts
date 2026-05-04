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
import { TaskStatus } from '@shared/models';

export const selectDashboardState =
  createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectDashboardViewModel = createSelector(
  selectDashboardState,
  (state): DashboardViewModel => {
    const tasks = state?.tasksData?.tasks ?? [];
    const activeTasks = tasks.filter((t) => t.status !== TaskStatus.DONE);
    const tasksDueSoon = getTasksDueInNext7Days(activeTasks);
    const usedIds = new Set(tasksDueSoon.map((t) => t.id));
    const recentlyCreatedTasks = getRecentlyCreatedTasks(
      activeTasks.filter((t) => !usedIds.has(t.id))
    );

    recentlyCreatedTasks.forEach((t) => usedIds.add(t.id));

    const recentlyUpdatedTasks = getRecentlyStatusChangedTasks(
      activeTasks.filter((t) => !usedIds.has(t.id))
    );

    return {
      currentBoards: getCurrentBoards(state?.boardsData?.boards ?? []),
      loading: state?.loading,
      recentlyCreatedTasks,
      recentlyUpdatedTasks,
      userName: state?.user?.name ?? '',
      tasksAmounts: countTasksByStatus(tasks),
      tasksDueSoon,
    };
  }
);
