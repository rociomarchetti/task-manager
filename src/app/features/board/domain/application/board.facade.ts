import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSelectors from '../state/selectors/board.selectors';
import * as fromActions from '../state/actions/board.actions';
import { Board, NewBoardData, NewTaskData } from '@shared/models';
import { BoardState } from '../state/state/board.state';
import { BoardViewModel } from '../entities/board-view.model';

@Injectable({ providedIn: 'root' })
export class BoardFacade {
  private readonly store = inject(Store<BoardState>);
  viewModel$: Observable<BoardViewModel> = this.store.select(
    fromSelectors.selectBoardViewModel
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

  addNewBoard(newBoardData: NewBoardData): void {
    this.store.dispatch(
      fromActions.BoardCreateActions.addNewBoard({ newBoardData })
    );
  }

  cancelChanges(): void {
    this.store.dispatch(fromActions.BoardEditActions.cancelChanges());
  }
}
