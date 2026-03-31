import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardFormComponent } from '../ui-board-form/board-form';

@Component({
  selector: 'app-board-edit',
  imports: [BoardFormComponent],
  templateUrl: './board-edit.html',
  styleUrl: './board-edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardEditFeature {}
