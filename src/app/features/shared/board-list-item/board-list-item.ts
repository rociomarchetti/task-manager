import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Board } from '@shared/models';
import { QuickAction } from '@shared/models/quick-action.model';
import { ListItem } from '@shared/features/list-item/list-item';

@Component({
  selector: 'app-board-list-item',
  imports: [ListItem],
  templateUrl: './board-list-item.html',
  styleUrl: './board-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListItem {
  board = input<Board>();

  seeBoard = output<Board>();
  removeBoard = output<Board>();

  get quickActions(): Array<QuickAction> {
    return [
      {
        id: 'see',
        icon: 'visibility',
        label: 'Ver',
      },
      {
        id: 'remove',
        icon: 'delete',
        label: 'Eliminar',
      },
    ];
  }

  onActionClicked(actionId: string) {
    switch (actionId) {
      case 'see':
        this.onSeeBoardClicked();
        break;

      case 'remove':
        this.onRemoveBoardClicked();
        break;
    }
  }

  onSeeBoardClicked() {
    this.seeBoard.emit(this.board()!);
  }

  onRemoveBoardClicked() {
    this.removeBoard.emit(this.board()!);
  }
}
