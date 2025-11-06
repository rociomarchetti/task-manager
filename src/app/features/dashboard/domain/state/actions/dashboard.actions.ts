import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@shared/user.model';
import { UserTasksSummary } from '../../entities/dashboard.model';

export const DashboardViewActions = createActionGroup({
  source: '[Dashboard]  Dashboard View',
  events: {
    'View Initialised': emptyProps(),
    'View Initialised Succeeded': props<{
      currentUser: User;
      tasksData: UserTasksSummary;
    }>(),
    'View Destroyed': emptyProps(),
  },
});
