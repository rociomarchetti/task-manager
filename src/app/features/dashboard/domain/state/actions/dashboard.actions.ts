import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Board,
  NewTaskData,
  Task,
  User,
  UserBoardsSummary,
  UserTasksSummary,
} from '@shared/models';

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
    'Edit Task': props<{
      updatedTask: Task;
    }>(),
    'Edit Task Succeeded': emptyProps(),
    'Edit Task Error': emptyProps(),
    'Updated Tasks Succeeded': props<{
      tasksData: UserTasksSummary;
    }>(),
    'Create New Task Clicked': props<{
      newTask: NewTaskData;
    }>(),
    'Create New Task Succeeded': emptyProps(),
    'Create New Task Error': emptyProps(),
    'Remove Task Clicked': props<{
      taskId: string;
    }>(),
    'Remove Task Succeeded': emptyProps(),
    'Remove Task Error': emptyProps(),
  },
});

export const DashboardBoardActions = createActionGroup({
  source: '[Dashboard] Dashboard Boards',
  events: {
    'Go To Board Clicked': props<{
      boardId: string;
    }>(),
    'Create New Board Clicked': emptyProps(),
    'Create New Board Succeeded': emptyProps(),
    'Create New Board Error': emptyProps(),
    'Remove Board Clicked': props<{
      boardId: string;
    }>(),
    'Remove Board Succeeded': props<{
      boardsUpdatedList: Board[];
    }>(),
    'Remove Board Error': emptyProps(),
    'Go To Boards List Clicked': emptyProps(),
  },
});
