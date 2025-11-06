import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DashboardTasksSummary } from '../ui-tasks-summary/dashboard-tasks-summary';
import { DashboardFacade } from './../domain/application/dashboard.facade';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, DashboardTasksSummary],
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
