import { Board, NewBoardData, UserBoardsSummary } from '@shared/models';
import { Observable, of } from 'rxjs';

export class BoardsServiceMock {
  getBoardsForUser(userId: number): Observable<UserBoardsSummary> {
    return of({} as UserBoardsSummary);
  }

  getBoardById(boardId: string): Observable<Board | null> {
    return of({} as Board);
  }

  updateBoard(updatedBoard: Board): Observable<Board> {
    return of({} as Board);
  }

  createNewBoard(data: NewBoardData, userId: number): Observable<Board> {
    return of({} as Board);
  }

  deleteBoard(boardId: string): Observable<null> {
    return of(null);
  }
}
