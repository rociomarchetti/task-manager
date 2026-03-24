import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board-list',
  imports: [],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListFeature {}
