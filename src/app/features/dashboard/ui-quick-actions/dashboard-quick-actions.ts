import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';

@Component({
  selector: 'app-dashboard-quick-actions',
  imports: [Panel, PanelBodyDirective],
  templateUrl: './dashboard-quick-actions.html',
  styleUrl: './dashboard-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardQuickActions {
  createNewBoardClicked = output<void>();
  createNewTaskClicked = output<void>();
  goToBoardsListClicked = output<void>();

  onCreateNewBoard(): void {
    this.createNewBoardClicked.emit();
  }

  onCreateNewTask(): void {
    this.createNewTaskClicked.emit();
  }

  onGoToBoardsList(): void {
    this.goToBoardsListClicked.emit();
  }
}
