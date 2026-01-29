import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TaskAmounts } from '@shared/models';
import { Panel } from '@shared/ui/panel/panel';
import {
  PanelFooterDirective,
  PanelHeaderDirective,
} from '@shared/ui/panel/panel.directive';

@Component({
  selector: 'app-dashboard-task-summary',
  imports: [Panel, PanelHeaderDirective, PanelFooterDirective],
  templateUrl: './dashboard-task-summary.html',
  styleUrl: './dashboard-task-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTaskSummary {
  tasks = input<TaskAmounts>();
}
