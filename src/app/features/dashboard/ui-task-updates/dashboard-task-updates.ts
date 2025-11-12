import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';
import { Task } from '../domain/entities/dashboard.model';

@Component({
  selector: 'app-dashboard-task-updates',
  imports: [Panel, PanelBodyDirective],
  templateUrl: './dashboard-task-updates.html',
  styleUrl: './dashboard-task-updates.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTaskUpdates {
  recentlyCreatedTasks = input<Array<Task>>();
  recentlyUpdatedTasks = input<Array<Task>>();
  tasksDueSoon = input<Array<Task>>();
}
