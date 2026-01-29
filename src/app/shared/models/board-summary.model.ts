import { Board } from './board.model';

export interface UserBoardsSummary {
  boards: Array<Board>;
  userId: number;
}
