import { Injectable } from '@angular/core';
import { Board, UserBoardsSummary } from '@shared/models';
import { delay, Observable, of } from 'rxjs';
import { mockBoards } from './__mocks__/mock-boards';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private boardsStorageKey = 'fake_boards';
  private boards: Board[] = this.seedBoards();

  getBoardsForUser(userId: number): Observable<UserBoardsSummary> {
    const userBoards = this.boards.filter((b) => b.userId === userId);

    const summary: UserBoardsSummary = {
      userId,
      boards: userBoards,
    };

    return of(summary).pipe(delay(300));
  }

  getBoardById(boardId: string): Observable<Board | null> {
    const board = this.boards.find((b) => b.id === boardId) ?? null;
    return of(board);
  }

  updateBoard(updatedBoard: Board): Observable<Board> {
    this.boards = this.boards.map((b) =>
      b.id === updatedBoard.id ? updatedBoard : b
    );

    this.saveBoards();
    return of(updatedBoard);
  }

  createBoard(board: Board): Observable<Board> {
    this.boards = [...this.boards, board];
    this.saveBoards();
    return of(board);
  }

  deleteBoard(boardId: string): Observable<void> {
    this.boards = this.boards.filter((b) => b.id !== boardId);
    this.saveBoards();
    return of(void 0);
  }

  private saveBoards(): void {
    localStorage.setItem(this.boardsStorageKey, JSON.stringify(this.boards));
  }

  private seedBoards(): Board[] {
    const stored = localStorage.getItem(this.boardsStorageKey);
    if (stored) {
      return JSON.parse(stored);
    }

    localStorage.setItem(this.boardsStorageKey, JSON.stringify(mockBoards));
    return mockBoards;
  }
}
