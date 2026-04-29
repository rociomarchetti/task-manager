import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
} from '@angular/core';
import { QuickAction } from '@shared/models/quick-action.model';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-item',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatMiniFabButton,
    MatTooltipModule,
  ],
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItem {
  variant = input<'task' | 'board'>();
  itemTitle = input<string>();
  actions = input<Array<QuickAction>>([]);
  hasMoreOptions = input<boolean>(false);

  actionClicked = output<string>();

  onActionClick(actionId: string) {
    this.actionClicked.emit(actionId);
  }

  @HostBinding('class')
  get hostClasses(): string {
    return `list-item list-item--${this.variant()}`;
  }
}
