import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board-list-item',
  imports: [],
  templateUrl: './board-list-item.html',
  styleUrl: './board-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListItem {}
