import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Board } from '@shared/models';
import { formatBoardDate } from '../domain/state/util/board-list.util';

@Component({
  selector: 'app-board-list-list',
  imports: [MatButtonModule],
  templateUrl: './board-list-list.html',
  styleUrl: './board-list-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListList {
  boards = input<Board[]>([]);
  filters = input<{ search: string; favorites: boolean } | null>(null);
  formatDate = formatBoardDate;

  goToBoardDetails = output<string>();
  removeBoard = output<string>();

  boardsToShow = computed(() => {
    const { search, favorites } = this.filters() ?? {
      search: '',
      favorites: false,
    };
    const all = this.boards() ?? [];

    const base = favorites ? all.filter((b) => b.isFavorite) : all;

    return base.filter((b) => b.title.toLowerCase().includes(search));
  });

  onGoToBoardDetails(boardId: string): void {
    this.goToBoardDetails.emit(boardId);
  }

  onRemoveBoard(boardId: string): void {
    this.removeBoard.emit(boardId);
  }
}
