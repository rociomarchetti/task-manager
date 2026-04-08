import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Board, NewTaskData, Task, UserTasksSummary } from '@shared/models';

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
