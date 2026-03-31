import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardFormComponent } from '../ui-board-form/board-form';

@Component({
  selector: 'app-board-create',
  imports: [BoardFormComponent],
  templateUrl: './board-create.html',
  styleUrl: './board-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCreateFeature {}
