import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '@shared/models';
import { List } from '@shared/ui/list/list';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';
import { TaskListItem } from 'app/features/shared/task-list-item/task-list-item';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-dashboard-task-updates',
  imports: [
    List,
    MatBadgeModule,
    MatCheckboxModule,
    Panel,
    PanelBodyDirective,
    TaskListItem,
  ],
  templateUrl: './dashboard-task-updates.html',
  styleUrl: './dashboard-task-updates.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTaskUpdates {
  recentlyCreatedTasks = input<Array<Task>>();
  recentlyUpdatedTasks = input<Array<Task>>();
  tasksDueSoon = input<Array<Task>>();

  seeTaskClicked = output<Task>();
  removeTaskClicked = output<Task>();
  markTaskAsDone = output<Task>();
  editTaskClicked = output<Task>();
  postponeTaskClicked = output<Task>();

  sections = [
    {
      title: 'Tareas próximas a vencerse:',
      tasks: () => this.tasksDueSoon(),
    },
    {
      title: 'Tareas creadas recientemente:',
      tasks: () => this.recentlyCreatedTasks(),
    },
    {
      title: 'Tareas actualizadas recientemente:',
      tasks: () => this.recentlyUpdatedTasks(),
    },
  ];

  get visibleSections() {
    return this.tasksDueSoon()?.length
      ? this.sections.slice(0, 2)
      : this.sections.slice(1, 3);
  }

  getBadge(section: { title: string; tasks: () => Task[] }): string | null {
    return section.title === 'Tareas próximas a vencerse:' ? '!' : null;
  }

  onSeeTask(task: Task): void {
    this.seeTaskClicked.emit(task);
  }

  onRemoveTask(task: Task): void {
    this.removeTaskClicked.emit(task);
  }

  onMarkTaskAsCompleted(task: Task): void {
    this.markTaskAsDone.emit(task);
  }

  onEditTask(task: Task): void {
    this.editTaskClicked.emit(task);
  }

  onPostponeTask(task: Task): void {
    this.postponeTaskClicked.emit(task);
  }
}
