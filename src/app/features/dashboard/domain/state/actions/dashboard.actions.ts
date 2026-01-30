import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, UserBoardsSummary, UserTasksSummary } from '@shared/models';

export const DashboardViewActions = createActionGroup({
  source: '[Dashboard]  Dashboard View',
  events: {
    'View Initialised': emptyProps(),
    'View Initialised Succeeded': props<{
      currentUser: User;
      tasksData: UserTasksSummary;
      boardsData: UserBoardsSummary;
    }>(),
    'View Destroyed': emptyProps(),
  },
});

export const DashboardTaskActions = createActionGroup({
  source: '[Dashboard]  Dashboard Tasks',
  events: {
    'Postponed Task': props<{
      taskId: string;
    }>(),
    'Postponed Task Succeeded': emptyProps(),
    'Completed Task': props<{
      taskId: string;
    }>(),
    'Completed Task Succeeded': emptyProps(),
    'Task Edit Succeeded': props<{
      tasksData: UserTasksSummary;
    }>(),
    'Task Edit Error': emptyProps(),
  },
});
