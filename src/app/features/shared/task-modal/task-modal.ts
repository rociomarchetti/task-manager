import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Task } from '@shared/models';
import { Modal } from '@shared/ui/modal/modal';

@Component({
  selector: 'app-task-modal',
  imports: [CommonModule, Modal],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskModal {
  isModalOpen = input<boolean>(false);
  selectedTask = input<Task | null>();

  modalClosed = output<void>();

  onCloseModal(): void {
    this.modalClosed.emit();
  }
}
