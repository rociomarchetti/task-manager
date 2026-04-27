import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Task } from '@shared/models';
import { QuickAction } from '@shared/models/quick-action.model';
import { ListItem } from '@shared/features/list-item/list-item';

@Component({
  selector: 'app-task-list-item',
  imports: [ListItem],
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListItem {
  task = input<Task>();

  seeTask = output<Task>();
  removeTask = output<Task>();
  markAsCompleted = output<Task>();
  editTask = output<Task>();
  postponeTask = output<Task>();

  get quickActions(): Array<QuickAction> {
    return [
      {
        id: 'edit',
        icon: 'edit',
        label: 'Editar',
      },
      {
        id: 'check',
        icon: 'check',
        label: 'Marcar como completada',
      },
      {
        id: 'postpone',
        icon: 'more_time',
        label: 'Retrasar vencimiento',
      },
    ];
  }

  onActionClicked(actionId: string) {
    switch (actionId) {
      case 'see':
        this.onSeeTaskClicked();
        break;

      case 'remove':
        this.onRemoveTaskClicked();
        break;

      case 'check':
        this.onCheckTaskCompleted();
        break;

      case 'edit':
        this.onEditTaskClicked();
        break;

      case 'postpone':
        this.onPostponeTaskClicked();
        break;
    }
  }

  onSeeTaskClicked() {
    this.seeTask.emit(this.task()!);
  }

  onRemoveTaskClicked() {
    this.removeTask.emit(this.task()!);
  }

  onCheckTaskCompleted() {
    this.markAsCompleted.emit(this.task()!);
  }

  onEditTaskClicked() {
    this.editTask.emit(this.task()!);
  }

  onPostponeTaskClicked() {
    this.postponeTask.emit(this.task()!);
  }
}
