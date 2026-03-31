import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BoardsService } from 'app/core/services/boards-service/boards-service';
import { selectAuthenticatedUser } from 'app/features/auth/domain/state';
import { catchError, exhaustMap, map, of, tap, withLatestFrom } from 'rxjs';
import * as fromActions from '../actions/board-list.actions';

@Injectable()
export class BoardListEffects {
  private readonly actions = inject(Actions);
  private readonly boardsService = inject(BoardsService);
  private router = inject(Router);
  private store = inject(Store);

  viewInitialised$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.BoardListViewActions.viewInitialised),
      withLatestFrom(this.store.select(selectAuthenticatedUser)),
      exhaustMap(([_, user]) => {
        return this.boardsService.getBoardsForUser(user.id).pipe(
          map((userBoards) => {
            return fromActions.BoardListViewActions.viewInitialisedSucceeded({
              boards: userBoards.boards,
            });
          })
        );
      })
    )
  );

  onCreateNewBoard$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(fromActions.BoardListViewActions.createBoardClicked),
        tap((_) => {
          this.router.navigate(['/app/boards/new']);
        })
      );
    },
    { dispatch: false }
  );

  onRemoveBoard$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.BoardListViewActions.removeBoardClicked),
      exhaustMap((action) =>
        this.boardsService.deleteBoard(action?.boardId).pipe(
          map(() => {
            return fromActions.BoardListViewActions.removeBoardSucceeded();
          }),
          catchError(() => {
            return of(fromActions.BoardListViewActions.removeBoardError());
          })
        )
      )
    )
  );

  onGoToBoardClicked$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(fromActions.BoardListViewActions.goToBoardDetailsClicked),
        tap((action) => {
          this.router.navigate([`/app/boards/${action?.boardId}`]);
        })
      );
    },
    { dispatch: false }
  );
}
