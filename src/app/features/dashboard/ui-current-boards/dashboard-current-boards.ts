import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Board } from '@shared/models';
import { List } from '@shared/ui/list/list';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';
import { mockBoards } from 'app/core/services/boards-service/__mocks__/mock-boards';
import { BoardListItem } from 'app/features/shared/board-list-item/board-list-item';

@Component({
  selector: 'app-dashboard-current-boards',
  imports: [BoardListItem, List, Panel, PanelBodyDirective],
  templateUrl: './dashboard-current-boards.html',
  styleUrl: './dashboard-current-boards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCurrentBoards {
  mockBoards = mockBoards;
  currentBoards = input<Array<Board>>();

  goToBoardClicked = output<Board>();
  removeBoardClicked = output<Board>();

  onGoToBoard(board: Board): void {
    this.goToBoardClicked.emit(board);
  }

  onRemoveBoard(board: Board): void {
    this.removeBoardClicked.emit(board);
  }
}
