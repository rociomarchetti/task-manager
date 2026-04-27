import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TaskAmounts } from '@shared/models';
import { Panel } from '@shared/ui/panel/panel';
import {
  getPorcentajeAvance,
  getStrokeDasharray,
} from '../domain/state/util/dashboard.util';

@Component({
  selector: 'app-dashboard-task-summary',
  imports: [Panel],
  templateUrl: './dashboard-task-summary.html',
  styleUrl: './dashboard-task-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTaskSummary {
  tasks = input<TaskAmounts>();

  strokeDasharray = computed(() => getStrokeDasharray(this.tasks()));

  progressPercentage = computed(() => getPorcentajeAvance(this.tasks()));
}
