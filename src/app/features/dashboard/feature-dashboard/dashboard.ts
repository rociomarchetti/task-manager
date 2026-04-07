import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DashboardTaskSummary } from '../ui-task-summary/dashboard-task-summary';
import { DashboardFacade } from './../domain/application/dashboard.facade';
import { DashboardTaskUpdates } from '../ui-task-updates/dashboard-task-updates';
import { TaskModal } from 'app/features/shared/task-modal/task-modal';
import { Board, NewTaskData, Task } from '@shared/models';
import { DashboardCurrentBoards } from '../ui-current-boards/dashboard-current-boards';
import { DashboardQuickActions } from '../ui-quick-actions/dashboard-quick-actions';
import { FormMode } from '@shared/models/form-mode.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    DashboardCurrentBoards,
    DashboardQuickActions,
    DashboardTaskSummary,
    DashboardTaskUpdates,
    TaskModal,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFeature implements OnInit {
  private readonly dashboardFacade = inject(DashboardFacade);
  readonly viewModel$ = this.dashboardFacade.viewModel$;

  isModalOpen = signal(false);
  taskModalMode = signal<FormMode>(FormMode.EDIT);
  selectedTask = signal<Task | null>(null);

  ngOnInit(): void {
    this.dashboardFacade.viewInitialised();
  }

  onModalClosed(): void {
    this.isModalOpen.set(false);
  }

  onMarkTaskAsDone(task: Task): void {
    this.dashboardFacade.markTaskAsDone(task?.id);
  }

  onEditTask(task: Task): void {
    this.selectedTask.set(task);
    this.isModalOpen.set(true);
  }

  onSeeTaskDetails(task: Task): void {
    this.selectedTask.set(task);
    this.isModalOpen.set(true);
  }

  onRemoveTask(task: Task): void {
    this.dashboardFacade.removeTask(task?.id);
  }

  onPostponeTask(task: Task): void {
    this.dashboardFacade.postponeTask(task?.id);
  }

  onGoToBoard(board: Board): void {
    this.dashboardFacade.goToBoard(board?.id);
  }

  onRemoveBoard(board: Board): void {
    this.dashboardFacade.removeBoard(board?.id);
  }

  onCreateNewBoard(): void {
    this.dashboardFacade.createNewBoard();
  }

  onCreateNewTaskClicked(): void {
    this.isModalOpen.set(true);
    this.taskModalMode.set(FormMode.CREATE);
  }

  onSaveNewTask(createdTask: NewTaskData): void {
    this.dashboardFacade.createNewTask(createdTask);
  }

  onSaveTaskChanges(updatedTask: Task): void {
    this.dashboardFacade.updateTask(updatedTask);
  }

  onGoToBoardsListClicked(): void {
    this.dashboardFacade.goToBoardsList();
  }
}
