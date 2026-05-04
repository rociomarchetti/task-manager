import { Board } from '@shared/models';

export interface BoardListViewModel {
  boards: Array<Board>;
  loading: boolean | null;
}
