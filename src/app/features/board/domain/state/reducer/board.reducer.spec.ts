import { Board, Task, UserTasksSummary } from '@shared/models';
import * as fromReducer from '../reducer/board.reducer';
import * as fromActions from '../actions/board.actions';

describe('GIVEN: Board Reducer', () => {
  const { boardInitialState } = fromReducer;

  describe('WHEN: viewInitialisedSucceeded', () => {
    it('THEN: should update state', () => {
      const mockCurrentBoard = {} as Board;
      const mockBoards = [{} as Board];
      const mockTasks = [{} as Task];
      const action = fromActions.BoardEditViewActions.viewInitialisedSucceeded({
        currentBoard: mockCurrentBoard,
        boards: mockBoards,
        taskLists: mockTasks,
      });

      const newState = fromReducer.boardReducerFunction(
        boardInitialState,
        action
      );

      expect(newState.currentBoard).toEqual(mockCurrentBoard);
      expect(newState.boards).toEqual(mockBoards);
      expect(newState.taskLists).toEqual(mockTasks);
    });
  });

  describe('WHEN: updatedTasksSucceeded', () => {
    it('THEN: should update state', () => {
      const mockTasksData = {} as UserTasksSummary;
      const action = fromActions.BoardEditActions.updatedTasksSucceeded({
        tasksData: mockTasksData,
      });

      const newState = fromReducer.boardReducerFunction(
        boardInitialState,
        action
      );

      expect(newState.taskLists).toEqual(mockTasksData.tasks);
    });
  });

  describe('WHEN: editBoardSucceeded', () => {
    it('THEN: should update state', () => {
      const mockBoard = {} as Board;
      const action = fromActions.BoardEditActions.editBoardSucceeded({
        updatedBoard: mockBoard,
      });

      const newState = fromReducer.boardReducerFunction(
        boardInitialState,
        action
      );

      expect(newState.currentBoard).toEqual(mockBoard);
    });
  });
});
