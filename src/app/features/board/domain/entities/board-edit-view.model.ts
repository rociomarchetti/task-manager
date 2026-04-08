import { Board, Task } from '@shared/models';

export interface BoardEditViewModel {
  boards: Array<Board>;
  currentBoard: Board;
  taskLists: {
    pending: Array<Task>;
    inProgress: Array<Task>;
    completed: Array<Task>;
  };
}
