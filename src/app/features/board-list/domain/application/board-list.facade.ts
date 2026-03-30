import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardListState } from '../state/state/board-list.state';
import * as fromActions from '../state/actions/board-list.actions';
import { Observable } from 'rxjs';
import { BoardListViewModel } from '../entities/board-list-view.model';
import * as fromSelectors from '../state/selectors/board-list.selectors';

@Injectable({ providedIn: 'root' })
export class BoardListFacade {
  private readonly store = inject(Store<BoardListState>);
  viewModel$: Observable<BoardListViewModel> = this.store.select(
    fromSelectors.selectBoardListViewModel
  );

  viewInitialised(): void {
    this.store.dispatch(fromActions.BoardListViewActions.viewInitialised());
  }

  createNewBoard(): void {
    this.store.dispatch(fromActions.BoardListViewActions.createBoardClicked());
  }

  removeBoard(boardId: string): void {
    this.store.dispatch(
      fromActions.BoardListViewActions.removeBoardClicked({ boardId })
    );
  }
}
