import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
import {
  checkTaskListsChanges,
  updateTaskLists,
} from '../domain/util/board.util';

@Component({
  selector: 'app-board-form',
  imports: [
    CdkDrag,
    CdkDropList,
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

  addTask = output<void>();
  saveBoardChanges = output<Board>();
  cancelChanges = output<void>();
  tasksUpdated = output<TaskListsData>();

  isEditTitleOn = signal(false);
  todoTasks = signal<string[]>([]);
  inProgressTasks = signal<string[]>([]);
  doneTasks = signal<string[]>([]);
  initialTaskListsState = signal<TaskListsData | null>(null);
  areChangesInTaskLists = signal(false);
  FormMode = FormMode;

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

  syncTaskListsToSignals = effect(() => {
    const data = this.tasks();
    if (!data) return;

    this.todoTasks.set(data.pending.map((t) => t.title));
    this.inProgressTasks.set(data.inProgress.map((t) => t.title));
    this.doneTasks.set(data.completed.map((t) => t.title));

    if (!this.initialTaskListsState()) {
      this.initialTaskListsState.set(data);
    }
  });

  changesInTaskListsEffect = effect(() => {
    const initial = this.initialTaskListsState();
    if (!initial) return;

    const areChanges = checkTaskListsChanges(
      initial,
      this.todoTasks(),
      this.inProgressTasks(),
      this.doneTasks()
    );

    this.areChangesInTaskLists.set(areChanges);
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

  dropTask(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.todoTasks.update((v) => [...v]);
    this.inProgressTasks.update((v) => [...v]);
    this.doneTasks.update((v) => [...v]);
  }

  onSaveTaskListsChanges() {
    const original = this.tasks();
    if (!original) return;

    const updatedTaskLists = updateTaskLists(
      original,
      this.todoTasks(),
      this.inProgressTasks(),
      this.doneTasks()
    );

    this.tasksUpdated.emit(updatedTaskLists);
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
