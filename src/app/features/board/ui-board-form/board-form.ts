import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Board } from '@shared/models';
import { FormMode } from '@shared/models/form-mode.model';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';
import { TaskListsData } from '../domain/entities/board.model';

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
  mode = input<FormMode>();
  board = input<Board>();
  tasks = input<TaskListsData>();

  FormMode = FormMode;
  isEditTitleOn = signal(false);

  addTask = output<void>();
  saveBoardChanges = output<Board>();
  cancelChanges = output<void>();

  boardForm: FormGroup = new FormGroup({
    title: new FormControl<string | null>('', [Validators.required]),
    description: new FormControl<string | null>(''),
  });

  syncBoardEffect = effect(() => {
    const data = this.board();

    if (data && this.mode() === FormMode.EDIT) {
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
    if (this.mode() === FormMode.CREATE) {
      return 'Crear nuevo tablero';
    }

    const board = this.board();
    return board ? board.title : '';
  }

  get isEditMode(): boolean {
    return this.mode() === FormMode.EDIT;
  }

  onEditTitleClicked(): void {
    this.isEditTitleOn.set(!this.isEditTitleOn());
  }

  onAddTaskClicked(): void {
    this.addTask.emit();
  }

  //TODO:
  onAddColumnClicked(): void {
    console.log('onAddColumnClicked');
  }

  onSaveChangesClicked(): void {
    const original = this.board();
    if (!original) return;

    const updatedBoard: Board = {
      ...original,
      title: this.boardForm.get('title')?.value ?? this.board()?.title,
      description:
        this.boardForm.get('description')?.value ?? this.board()?.description,
    };

    this.saveBoardChanges.emit(updatedBoard);
  }

  //TODO:
  onSaveNewBoardClicked(): void {
    console.log('onSaveNewBoardClicked');
  }

  onCancelClicked(): void {
    this.boardForm.reset();
    this.cancelChanges.emit();
  }

  onGoBackClicked(): void {
    this.boardForm.reset();
    this.cancelChanges.emit();
  }
}
