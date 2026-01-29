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
import { Task } from '@shared/models';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, DashboardTaskSummary, DashboardTaskUpdates, TaskModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFeature implements OnInit {
  private readonly dashboardFacade = inject(DashboardFacade);
  readonly viewModel$ = this.dashboardFacade.viewModel$;

  isModalOpen = signal(false);
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

  onPostponeTask(task: Task): void {
    this.dashboardFacade.postponeTask(task?.id);
  }
}
