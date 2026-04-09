import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoardFormComponent } from '../ui-board-form/board-form';
import { FormMode } from '@shared/models/form-mode.model';
import { BoardFacade } from '../domain/application/board.facade';
import { NewBoardData } from '@shared/models';

@Component({
  selector: 'app-board-create',
  imports: [BoardFormComponent],
  templateUrl: './board-create.html',
  styleUrl: './board-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCreateFeature {
  private readonly boardFacade = inject(BoardFacade);

  FormMode = FormMode;

  onCancelChanges(): void {
    this.boardFacade.cancelChanges();
  }

  onSaveNewBoard(newBoardData: NewBoardData): void {
    this.boardFacade.addNewBoard(newBoardData);
  }
}
