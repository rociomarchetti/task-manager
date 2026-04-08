import { Board } from '@shared/models';
import { TaskListsData } from './board.model';

export interface BoardEditViewModel {
  boards: Array<Board> | null;
  currentBoard: Board | null;
  taskLists: TaskListsData | null;
}
