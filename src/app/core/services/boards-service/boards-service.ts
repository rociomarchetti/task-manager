import { Injectable } from '@angular/core';
import { Board, NewBoardData, UserBoardsSummary } from '@shared/models';
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

  createNewBoard(data: NewBoardData, userId: number): Observable<Board> {
    const newBoard: Board = {
      id: this.generateId(),
      title: data.title,
      description: data.description ?? '',
      isFavorite: data.isFavorite ?? false,
      isWip: false,
      createdAt: new Date(),
      userId,
      addedColumns: data.addedColumns ?? [],
    };

    this.boards = [...this.boards, newBoard];
    this.saveBoards();

    return of(newBoard).pipe(delay(300));
  }

  deleteBoard(boardId: string): Observable<Board[]> {
    this.boards = this.boards.filter((b) => b.id !== boardId);
    this.saveBoards();

    return of([...this.boards]);
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

  private generateId(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const usedIds = new Set(this.boards.map((b) => b.id));

    for (const char of alphabet) {
      if (!usedIds.has(char)) {
        return char;
      }
    }

    throw new Error('No hay letras disponibles para generar IDs');
  }
}
