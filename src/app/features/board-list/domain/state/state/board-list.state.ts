import { Board } from '@shared/models';

export const boardListFeatureKey = 'BoardList_State';

export interface BoardListState {
  boards: Array<Board>;
}
