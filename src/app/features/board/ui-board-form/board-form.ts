import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-board-form',
  imports: [],
  templateUrl: './board-form.html',
  styleUrl: './board-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardFormComponent {
  mode = input<'edit' | 'create'>();
}
