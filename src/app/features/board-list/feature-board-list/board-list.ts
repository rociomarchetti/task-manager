import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';
import { mockBoards } from 'app/core/services/boards-service/__mocks__/mock-boards';

@Component({
  selector: 'app-board-list',
  imports: [Panel, PanelBodyDirective],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListFeature {
  mockBoards = mockBoards;
}
