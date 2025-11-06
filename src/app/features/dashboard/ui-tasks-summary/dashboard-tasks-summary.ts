import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Panel } from '@shared/ui/panel/panel';
import {
  PanelFooterDirective,
  PanelHeaderDirective,
} from '@shared/ui/panel/panel.directive';
import { TaskAmounts } from '../domain/entities/dashboard.model';

@Component({
  selector: 'app-dashboard-tasks-summary',
  imports: [Panel, PanelHeaderDirective, PanelFooterDirective],
  templateUrl: './dashboard-tasks-summary.html',
  styleUrl: './dashboard-tasks-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTasksSummary {
  tasks = input<TaskAmounts>();
}
