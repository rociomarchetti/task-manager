import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '@shared/models';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';

@Component({
  selector: 'app-dashboard-task-updates',
  imports: [MatCheckboxModule, Panel, PanelBodyDirective],
  templateUrl: './dashboard-task-updates.html',
  styleUrl: './dashboard-task-updates.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTaskUpdates {
  recentlyCreatedTasks = input<Array<Task>>();
  recentlyUpdatedTasks = input<Array<Task>>();
  tasksDueSoon = input<Array<Task>>();

  markTaskAsDone = output<Task>();
  editTaskClicked = output<Task>();
  seeDetailsClicked = output<Task>();
  postponeTaskClicked = output<Task>();

  onMarkTaskAsCompleted(task: Task): void {
    this.markTaskAsDone.emit(task);
  }

  onEditTask(task: Task): void {
    this.editTaskClicked.emit(task);
  }

  onSeeTaskDetails(task: Task): void {
    this.seeDetailsClicked.emit(task);
  }

  onPostponeTask(task: Task): void {
    this.postponeTaskClicked.emit(task);
  }
}
