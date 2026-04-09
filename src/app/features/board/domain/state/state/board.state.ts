import { Board, Task } from '@shared/models';

export const boardFeatureKey = 'Board_State';
export interface BoardState {
  currentBoard: Board | null;
  boards: Array<Board> | null;
  taskLists: Array<Task> | null;
}
