import { inject, Injectable } from '@angular/core';
import * as fromActions from '../actions/board.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from 'app/core/services/tasks-service/tasks-service';
import { BoardsService } from 'app/core/services/boards-service/boards-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  forkJoin,
  map,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import { selectAuthenticatedUser } from 'app/features/auth/domain/state';

@Injectable()
export class BoardEffects {
  private readonly actions = inject(Actions);
  private readonly tasksService = inject(TasksService);
  private readonly boardsService = inject(BoardsService);
  private router = inject(Router);
  private store = inject(Store);

  viewInitialised$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.BoardEditViewActions.viewInitialised),
      withLatestFrom(this.store.select(selectAuthenticatedUser)),
      exhaustMap(([action, user]) => {
        const currentBoard = this.boardsService.getBoardById(action?.boardId);
        const userTasksSummary = this.tasksService.getTasksForUser(user!.id);
        const userBoardsSummary = this.boardsService.getBoardsForUser(user!.id);

        return forkJoin([
          currentBoard,
          userTasksSummary,
          userBoardsSummary,
        ]).pipe(
          map(([currentBoard, userTasksSummary, userBoardsSummary]) => {
            return fromActions.BoardEditViewActions.viewInitialisedSucceeded({
              currentBoard: currentBoard,
              boards: userBoardsSummary?.boards,
              taskLists: userTasksSummary?.tasks,
            });
          })
        );
      })
    )
  );

  addNewTask$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.BoardEditActions.addNewTask),
      withLatestFrom(this.store.select(selectAuthenticatedUser)),
      exhaustMap(([action, user]) =>
        this.tasksService.addTask(action?.newTaskData, user!.id).pipe(
          map(() => {
            return fromActions.BoardEditActions.addNewTaskSucceeded();
          }),
          catchError(() => {
            return of(fromActions.BoardEditActions.addNewTaskError());
          })
        )
      )
    )
  );

  addNewBoard$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.BoardCreateActions.addNewBoard),
      withLatestFrom(this.store.select(selectAuthenticatedUser)),
      exhaustMap(([action, user]) => {
        return this.boardsService
          .createNewBoard(action?.newBoardData, user!.id)
          .pipe(
            map(() => {
              return fromActions.BoardCreateActions.addNewBoardSucceeded();
            }),
            catchError(() => {
              return of(fromActions.BoardCreateActions.addNewBoardError());
            })
          );
      })
    )
  );

  onEditedTaskList$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.BoardEditActions.addNewTaskSucceeded),
      withLatestFrom(this.store.select(selectAuthenticatedUser)),
      exhaustMap(([_, user]) =>
        this.tasksService.getTasksForUser(user!.id).pipe(
          map((userTasksSummary) => {
            return fromActions.BoardEditActions.updatedTasksSucceeded({
              tasksData: userTasksSummary!,
            });
          })
        )
      )
    )
  );

  updateBoard$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.BoardEditActions.editBoard),
      exhaustMap((action) =>
        this.boardsService.updateBoard(action?.updatedBoard).pipe(
          map((editedBoard) => {
            return fromActions.BoardEditActions.editBoardSucceeded({
              updatedBoard: editedBoard,
            });
          }),
          catchError(() => {
            return of(fromActions.BoardEditActions.editBoardError());
          })
        )
      )
    )
  );

  onBoardChangesSuccess$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(
          fromActions.BoardCreateActions.addNewBoardSucceeded,
          fromActions.BoardEditActions.editBoardSucceeded
        ),
        tap(() => {
          this.router.navigate(['/app/boards-list']);
        })
      );
    },
    { dispatch: false }
  );

  cancelChanges$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromActions.BoardEditActions.cancelChanges),
        tap(() => {
          this.router.navigate(['/app/boards-list']);
        })
      ),
    { dispatch: false }
  );
}
