import { Board, Task } from '@shared/models';

export const boardEditFeatureKey = 'Board_Edit_State';
export interface BoardState {
  currentBoard: Board | null;
  boards: Array<Board> | null;
  taskLists: Array<Task> | null;
}
