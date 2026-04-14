import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
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
import { MatSelectModule } from '@angular/material/select';
import { Board, NewTaskData, Task, TaskStatus } from '@shared/models';
import { FormMode } from '@shared/models/form-mode.model';
import { Modal } from '@shared/ui/modal/modal';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { formatDate } from '@shared/features/util/formatDate.util';

@Component({
  selector: 'app-task-modal',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    Modal,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskModal {
  mode = input<FormMode>();
  isModalOpen = input<boolean>(false);
  task = input<Task>();
  currentBoards = input<Array<Board>>([]);
  isCreatingTaskFromBoard = input<boolean>(false);
  currentBoardId = input<string>();

  modalClosed = output<void>();
  saveTaskChanges = output<Task>();
  saveNewTask = output<NewTaskData>();

  TaskStatus = TaskStatus;
  FormMode = FormMode;
  formatDate = formatDate;

  taskForm: FormGroup = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null),
    status: new FormControl<TaskStatus | null>(null, [Validators.required]),
    boardId: new FormControl<string | null>(null, [Validators.required]),
    dueDate: new FormControl<Date | null>(null),
  });

  syncTaskEffect = effect(() => {
    const mode = this.mode();
    const task = this.task();
    const isFromBoard = this.isCreatingTaskFromBoard();
    const boardId = this.currentBoardId();

    if (mode === FormMode.EDIT && task) {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description ?? '',
        status: task.status,
        boardId: task.boardId,
        dueDate: task.dueDate ?? null,
      });
      return;
    }

    if (mode === FormMode.CREATE) {
      this.taskForm.reset({
        title: '',
        description: '',
        status: null,
        boardId: isFromBoard ? boardId : '',
        dueDate: null,
      });
    }
  });

  get canEditFields(): boolean {
    return this.mode() !== FormMode.VIEW;
  }

  get boardsId(): Array<string> {
    return this.getBoardIds(this.currentBoards());
  }

  onCloseModal(): void {
    this.modalClosed.emit();
  }

  onSaveChanges(): void {
    const original = this.task();
    if (!original) return;

    const updatedTask: Task = {
      ...original,
      title: this.taskForm.get('title')?.value ?? this.task()?.title,
      description: this.taskForm.get('description')?.value ?? undefined,
      dueDate:
        this.parseToISO(this.taskForm.get('dueDate')?.value) ?? undefined,
      status: this.taskForm.get('status')?.value ?? this.task()?.status,
      boardId: this.taskForm.get('boardId')?.value ?? this.task()?.boardId,
    };

    this.saveTaskChanges.emit(updatedTask);
  }

  onSaveNewTask(): void {
    const newTask: NewTaskData = {
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value ?? undefined,
      dueDate:
        this.parseToISO(this.taskForm.get('dueDate')?.value) ?? undefined,
      status: this.taskForm.get('status')?.value,
      boardId: this.taskForm.get('boardId')?.value,
    };

    this.saveNewTask.emit(newTask);
  }

  onCancelClicked(): void {
    this.modalClosed.emit();
  }

  private parseToISO(dateString: string): Date {
    return new Date(dateString);
  }

  private getBoardIds = (boards: Board[]): string[] => {
    return boards?.map((board) => board.id);
  };
}
