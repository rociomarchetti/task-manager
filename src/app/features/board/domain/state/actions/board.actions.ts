import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Board,
  NewBoardData,
  NewTaskData,
  Task,
  UserTasksSummary,
} from '@shared/models';

export const BoardEditViewActions = createActionGroup({
  source: '[Board] Board Edit View',
  events: {
    'View Initialised': props<{
      boardId: string;
    }>(),
    'View Initialised Succeeded': props<{
      currentBoard: Board | null;
      boards: Array<Board>;
      taskLists: Array<Task>;
    }>(),
    'View Destroyed': emptyProps(),
  },
});

export const BoardEditActions = createActionGroup({
  source: '[Board] Board Edit',
  events: {
    'Edit Board': props<{
      updatedBoard: Board;
    }>(),
    'Edit Board Succeeded': props<{
      updatedBoard: Board;
    }>(),
    'Edit Board Error': emptyProps(),
    'Add New Task': props<{
      newTaskData: NewTaskData;
    }>(),
    'Add New Task Succeeded': emptyProps(),
    'Add New Task Error': emptyProps(),
    'Updated Tasks Succeeded': props<{
      tasksData: UserTasksSummary;
    }>(),
    'Cancel Changes': emptyProps(),
  },
});

export const BoardCreateActions = createActionGroup({
  source: '[Board] Board Create',
  events: {
    'Add New Board': props<{
      newBoardData: NewBoardData;
    }>(),
    'Add New Board Succeeded': emptyProps(),
    'Add New Board Error': emptyProps(),
  },
});
