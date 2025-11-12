import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DashboardTaskSummary } from '../ui-task-summary/dashboard-task-summary';
import { DashboardFacade } from './../domain/application/dashboard.facade';
import { DashboardTaskUpdates } from '../ui-task-updates/dashboard-task-updates';

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

  ngOnInit(): void {
    this.dashboardFacade.viewInitialised();
  }
}
