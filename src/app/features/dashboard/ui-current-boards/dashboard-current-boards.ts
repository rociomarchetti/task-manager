import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Board } from '@shared/models';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';

@Component({
  selector: 'app-dashboard-current-boards',
  imports: [Panel, PanelBodyDirective],
  templateUrl: './dashboard-current-boards.html',
  styleUrl: './dashboard-current-boards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCurrentBoards {
  currentBoards = input<Array<Board>>();

  goToBoardClicked = output<Board>();

  onGoToBoard(board: Board): void {
    this.goToBoardClicked.emit(board);
  }
}
