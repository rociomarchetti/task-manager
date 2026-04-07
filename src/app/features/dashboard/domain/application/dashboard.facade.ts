import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardState } from '../state/state/dashboard.state';
import { Observable } from 'rxjs';
import { DashboardViewModel } from '../entities/dashboard-view.model';
import * as fromSelectors from '../state/selectors/dashboard.selectors';
import * as fromActions from '../state/actions/dashboard.actions';
import { NewTaskData, Task } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private readonly store = inject(Store<DashboardState>);
  viewModel$: Observable<DashboardViewModel> = this.store.select(
    fromSelectors.selectDashboardViewModel
  );

  viewInitialised(): void {
    this.store.dispatch(fromActions.DashboardViewActions.viewInitialised());
  }

  markTaskAsDone(taskId: string): void {
    this.store.dispatch(
      fromActions.DashboardTaskActions.completedTask({ taskId })
    );
  }

  postponeTask(taskId: string): void {
    this.store.dispatch(
      fromActions.DashboardTaskActions.postponedTask({ taskId })
    );
  }

  goToBoard(boardId: string): void {
    this.store.dispatch(
      fromActions.DashboardBoardActions.goToBoardClicked({ boardId })
    );
  }

  removeBoard(boardId: string): void {
    this.store.dispatch(
      fromActions.DashboardBoardActions.removeBoardClicked({ boardId })
    );
  }

  createNewBoard(): void {
    this.store.dispatch(
      fromActions.DashboardBoardActions.createNewBoardClicked()
    );
  }

  createNewTask(newTask: NewTaskData): void {
    this.store.dispatch(
      fromActions.DashboardTaskActions.createNewTaskClicked({ newTask })
    );
  }

  updateTask(updatedTask: Task): void {
    this.store.dispatch(
      fromActions.DashboardTaskActions.editTask({ updatedTask })
    );
  }

  removeTask(taskId: string): void {
    this.store.dispatch(
      fromActions.DashboardTaskActions.removeTaskClicked({ taskId })
    );
  }

  goToBoardsList(): void {
    this.store.dispatch(
      fromActions.DashboardBoardActions.goToBoardsListClicked()
    );
  }
}
