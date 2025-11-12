import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Task } from '../domain/entities/dashboard.model';
import { Panel } from '@shared/ui/panel/panel';
import {
  PanelFooterDirective,
  PanelHeaderDirective,
} from '@shared/ui/panel/panel.directive';

@Component({
  selector: 'app-dashboard-task-updates',
  imports: [Panel, PanelHeaderDirective, PanelFooterDirective],
  templateUrl: './dashboard-task-updates.html',
  styleUrl: './dashboard-task-updates.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTaskUpdates {
  recentlyCreatedTasks = input<Array<Task>>();
  recentlyUpdatedTasks = input<Array<Task>>();
  tasksDueSoon = input<Array<Task>>();
}
