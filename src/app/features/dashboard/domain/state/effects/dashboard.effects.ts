import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TasksService } from 'app/core/services/tasks-service/tasks-service';
import * as fromActions from '../actions/dashboard.actions';
import { exhaustMap, map, withLatestFrom } from 'rxjs';
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
}
