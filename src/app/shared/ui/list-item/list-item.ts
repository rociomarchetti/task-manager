import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
} from '@angular/core';
import { QuickAction } from '@shared/models/quick-action.model';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItem {
  variant = input<'one' | 'two'>();
  itemTitle = input<string>();
  actions = input<Array<QuickAction>>([]);

  actionClicked = output<string>();

  onActionClick(actionId: string) {
    this.actionClicked.emit(actionId);
  }

  @HostBinding('class')
  get hostClasses(): string {
    return `list-item list-item--${this.variant()}`;
  }
}
