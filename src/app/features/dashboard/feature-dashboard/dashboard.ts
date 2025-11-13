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
import { Task } from '../domain/entities/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, DashboardTaskSummary, DashboardTaskUpdates],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFeature implements OnInit {
  private readonly dashboardFacade = inject(DashboardFacade);
  readonly viewModel$ = this.dashboardFacade.viewModel$;

  isModalOpen = signal(false);
  selectedTask = signal<string | null>(null);

  ngOnInit(): void {
    this.dashboardFacade.viewInitialised();
  }

  onMarkTaskAsCompleted(task: Task): void {
    console.log(task);
  }

  onEditTask(task: Task): void {
    console.log(task);
  }

  onSeeTaskDetails(task: Task): void {
    console.log(task);
  }

  onPostponeTask(task: Task): void {
    console.log(task);
  }
}
