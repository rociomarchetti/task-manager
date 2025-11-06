import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-tasks-summary',
  imports: [],
  templateUrl: './dashboard-tasks-summary.html',
  styleUrl: './dashboard-tasks-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTasksSummary {}
