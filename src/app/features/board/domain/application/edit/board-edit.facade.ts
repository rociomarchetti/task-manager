import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BoardState } from '../../state/state/board.state';
import { BoardEditViewModel } from '../../entities/board-edit-view.model';
import * as fromSelectors from '../../state/edit/selectors/board-edit.selectors';
import * as fromActions from '../../state/edit/actions/board-edit.actions';
import { Board, NewTaskData } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class BoardEditFacade {
  private readonly store = inject(Store<BoardState>);
  viewModel$: Observable<BoardEditViewModel> = this.store.select(
    fromSelectors.selectBoardEditViewModel
  );

  viewInitialised(boardId: string): void {
    this.store.dispatch(
      fromActions.BoardEditViewActions.viewInitialised({ boardId })
    );
  }

  addNewTask(newTaskData: NewTaskData): void {
    this.store.dispatch(
      fromActions.BoardEditActions.addNewTask({ newTaskData })
    );
  }

  editBoard(updatedBoard: Board): void {
    this.store.dispatch(
      fromActions.BoardEditActions.editBoard({ updatedBoard })
    );
  }
}
