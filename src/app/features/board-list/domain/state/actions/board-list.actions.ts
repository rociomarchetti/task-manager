import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Board } from '@shared/models';

export const BoardListViewActions = createActionGroup({
  source: '[BoardList]  BoardList View',
  events: {
    'View Initialised': emptyProps(),
    'View Initialised Succeeded': props<{
      boards: Array<Board>;
    }>(),
    'View Destroyed': emptyProps(),
    'Create Board Clicked': emptyProps(),
    'Remove Board Clicked': props<{
      boardId: string;
    }>(),
    'Remove Board Succeeded': emptyProps(),
    'Remove Board Error': emptyProps(),
    'Go To Board Details Clicked': props<{ boardId: string }>(),
  },
});
