import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Task } from '@shared/models';
import { QuickAction } from '@shared/models/quick-action.model';
import { ListItem } from '@shared/ui/list-item/list-item';

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

  get quickActions(): Array<QuickAction> {
    return [
      {
        id: 'see',
        icon: 'visibility',
        label: 'Ver',
      },
      {
        id: 'remove',
        icon: 'delete',
        label: 'Eliminar',
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
    }
  }

  onSeeTaskClicked() {
    this.seeTask.emit(this.task());
  }

  onRemoveTaskClicked() {
    this.removeTask.emit(this.task());
  }
}
