import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
} from '@angular/core';
import { Board, Task } from '@shared/models';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';

@Component({
  selector: 'app-board-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    Panel,
    PanelBodyDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './board-form.html',
  styleUrl: './board-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardFormComponent {
  mode = input<'edit' | 'create'>();
  board = input<Board | null>(null);
  tasks = input<{
    pending: Array<Task>;
    inProgress: Array<Task>;
    completed: Array<Task>;
  }>({ pending: [], inProgress: [], completed: [] });

  isEditTitleOn = signal(false);

  boardForm: FormGroup = new FormGroup({
    title: new FormControl<string | null>('', [Validators.required]),
    description: new FormControl<string | null>(''),
  });

  syncBoardEffect = effect(() => {
    const data = this.board();

    if (data && this.mode() === 'edit') {
      this.boardForm.patchValue({
        title: data.title,
        description: data.description,
      });
    } else {
      this.boardForm.reset({
        title: '',
        description: '',
      });
    }
  });

  get boardTitle(): string {
    return !!this.mode() && this.mode() === 'create'
      ? 'Crear nuevo tablero'
      : this.board().title;
  }

  onEditTitleClicked(): void {
    this.isEditTitleOn.set(!this.isEditTitleOn());
  }

  onAddTaskClicked(): void {
    console.log('onAddTaskClicked');
  }

  onAddColumnClicked(): void {
    console.log('onAddColumnClicked');
  }

  onSaveChangesClicked(): void {
    console.log('onSaveChangesClicked');
  }

  /*   onGoBackClicked(): void {
    console.log('onGoBackClicked');
  } */

  onSaveNewBoardClicked(): void {
    console.log('onSaveNewBoardClicked');
  }

  onCancelClicked(): void {
    console.log('onCancelClicked');
  }
}
