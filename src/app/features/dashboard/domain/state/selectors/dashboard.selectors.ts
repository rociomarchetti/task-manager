import { DashboardViewModel } from './../../entities/dashboard-view.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState, featureKey } from '../state/dashboard.state';
import { countTasksByStatus } from '../util/dashboard.util';

export const selectDashboardState =
  createFeatureSelector<DashboardState>(featureKey);

export const selectDashboardViewModel = createSelector(
  selectDashboardState,
  (state): DashboardViewModel => ({
    userName: state?.user?.name,
    tasksAmounts: countTasksByStatus(state?.tasksData?.tasks),
  })
);
