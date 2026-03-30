import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { mockBoards } from 'app/core/services/boards-service/__mocks__/mock-boards';
import { BoardListList } from '../ui-list/board-list-list';
import { BoardListTopActionBar } from '../ui-top-action-bar/board-list-top-action-bar';

@Component({
  selector: 'app-board-list',
  imports: [BoardListList, BoardListTopActionBar],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListFeature {
  mockBoards = mockBoards;
  filtersChanged = signal<{ search: string; favorites: boolean } | null>(null);

  onCreateBoard(): void {
    console.log('onCreateBoard');
  }

  onSearchBoardUpdated(event: { search: string; favorites: boolean }): void {
    this.filtersChanged.set(event);
  }
}
