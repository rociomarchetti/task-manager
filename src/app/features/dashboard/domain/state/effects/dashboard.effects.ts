import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TasksService } from 'app/core/services/tasks-service/tasks-service';
import * as fromActions from '../actions/dashboard.actions';
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
import { BoardsService } from 'app/core/services/boards-service/boards-service';
import { Router } from '@angular/router';

@Injectable()
export class DashboardEffects {
  private readonly actions = inject(Actions);
  private readonly tasksService = inject(TasksService);
  private readonly boardsService = inject(BoardsService);
  private router = inject(Router);
  private store = inject(Store);

  viewInitialised$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.DashboardViewActions.viewInitialised),
      withLatestFrom(this.store.select(selectAuthenticatedUser)),
      exhaustMap(([_, user]) => {
        const userTasksSummary = this.tasksService.getTasksForUser(user?.id);
        const userCurrentBoards = this.boardsService.getBoardsForUser(user?.id);

        return forkJoin([userTasksSummary, userCurrentBoards]).pipe(
          map(([userTasksSummary, userCurrentBoards]) => {
            return fromActions.DashboardViewActions.viewInitialisedSucceeded({
              currentUser: user,
              tasksData: userTasksSummary,
              boardsData: userCurrentBoards,
            });
          })
        );
      })
    )
  );

  postponedTask$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.DashboardTaskActions.postponedTask),
      exhaustMap((action) =>
        this.tasksService.postponeTask(action?.taskId, 7).pipe(
          map(() => {
            return fromActions.DashboardTaskActions.postponedTaskSucceeded();
          }),
          catchError(() => {
            return of(fromActions.DashboardTaskActions.taskEditError());
          })
        )
      )
    )
  );

  completedTask$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.DashboardTaskActions.completedTask),
      exhaustMap((action) =>
        this.tasksService.markTaskAsDone(action?.taskId).pipe(
          map(() => {
            return fromActions.DashboardTaskActions.completedTaskSucceeded();
          }),
          catchError(() => {
            return of(fromActions.DashboardTaskActions.taskEditError());
          })
        )
      )
    )
  );

  onEditedTask$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.DashboardTaskActions.completedTaskSucceeded,
        fromActions.DashboardTaskActions.postponedTaskSucceeded
      ),
      withLatestFrom(this.store.select(selectAuthenticatedUser)),
      exhaustMap(([_, user]) =>
        this.tasksService.getTasksForUser(user?.id).pipe(
          map((userTasksSummary) => {
            return fromActions.DashboardTaskActions.taskEditSucceeded({
              tasksData: userTasksSummary,
            });
          })
        )
      )
    )
  );

  onRemoveBoard$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.DashboardBoardActions.removeBoardClicked),
      exhaustMap((action) =>
        this.boardsService.deleteBoard(action?.boardId).pipe(
          map(() => {
            return fromActions.DashboardBoardActions.removeBoardSucceeded();
          }),
          catchError(() => {
            return of(fromActions.DashboardBoardActions.removeBoardError());
          })
        )
      )
    )
  );

  onGoToBoardClicked$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(fromActions.DashboardBoardActions.goToBoardClicked),
        tap((boardId) => {
          this.router.navigate([`/boards/${boardId}`]);
        })
      );
    },
    { dispatch: false }
  );

  onGoToBoardsListClicked$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(fromActions.DashboardBoardActions.goToBoardsListClicked),
        tap(() => {
          this.router.navigate(['/boards']);
        })
      );
    },
    { dispatch: false }
  );
}
