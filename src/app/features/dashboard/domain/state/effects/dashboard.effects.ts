import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TasksService } from 'app/core/services/tasks-service/tasks-service';
import * as fromActions from '../actions/dashboard.actions';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { selectAuthenticatedUser } from 'app/features/auth/domain/state';

@Injectable()
export class DashboardEffects {
  private readonly actions = inject(Actions);
  private readonly tasksService = inject(TasksService);
  private store = inject(Store);

  viewInitialised$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.DashboardViewActions.viewInitialised),
      withLatestFrom(this.store.select(selectAuthenticatedUser)),
      exhaustMap(([_, user]) => {
        return this.tasksService.getTasksForUser(user?.id).pipe(
          map((userTasksSummary) => {
            return fromActions.DashboardViewActions.viewInitialisedSucceeded({
              currentUser: user,
              tasksData: userTasksSummary,
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
}
