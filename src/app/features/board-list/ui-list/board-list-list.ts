import { ConfirmationModal } from '@shared/features/confirmation-modal/confirmation-modal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Board } from '@shared/models';
import { formatDate } from '@shared/features/util/formatDate.util';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-board-list-list',
  imports: [
    ConfirmationModal,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './board-list-list.html',
  styleUrl: './board-list-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListList {
  boards = input<Board[]>([]);
  filters = input<{ search: string; favorites: boolean } | null>(null);
  formatDate = formatDate;

  goToBoardDetails = output<string>();
  removeBoard = output<string>();

  isModalOpen = signal(false);
  selectedBoard = signal<Board | null>(null);

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

  onModalClosed(): void {
    this.isModalOpen.set(false);
  }

  onModalConfirmDeletion(): void {
    const selectedBoardId = this.selectedBoard()?.id;
    this.removeBoard.emit(selectedBoardId!);
    this.isModalOpen.set(false);
  }

  onRemoveBoard(board: Board): void {
    this.selectedBoard.set(board);
    this.isModalOpen.set(true);
  }
}
