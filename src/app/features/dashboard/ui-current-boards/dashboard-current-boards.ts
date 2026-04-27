import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { ConfirmationModal } from '@shared/features/confirmation-modal/confirmation-modal';
import { Board } from '@shared/models';
import { List } from '@shared/ui/list/list';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';
import { mockBoards } from 'app/core/services/boards-service/__mocks__/mock-boards';
import { BoardListItem } from 'app/features/shared/board-list-item/board-list-item';

@Component({
  selector: 'app-dashboard-current-boards',
  imports: [ConfirmationModal, BoardListItem, List, Panel, PanelBodyDirective],
  templateUrl: './dashboard-current-boards.html',
  styleUrl: './dashboard-current-boards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCurrentBoards {
  mockBoards = mockBoards;
  currentBoards = input<Array<Board>>();

  goToBoardClicked = output<Board>();
  removeBoardClicked = output<Board>();

  isModalOpen = signal(false);
  selectedBoard = signal<Board | null>(null);

  onGoToBoard(board: Board): void {
    this.goToBoardClicked.emit(board);
  }

  onModalClosed(): void {
    this.isModalOpen.set(false);
  }

  onModalConfirmDeletion(): void {
    this.removeBoardClicked.emit(this.selectedBoard()!);
    this.isModalOpen.set(false);
  }

  onRemoveBoard(board: Board): void {
    this.selectedBoard.set(board);
    this.isModalOpen.set(true);
  }
}
