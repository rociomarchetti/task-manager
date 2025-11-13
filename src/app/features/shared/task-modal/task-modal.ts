import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Modal } from '@shared/ui/modal/modal';
import { Task } from 'app/features/dashboard/domain/entities/dashboard.model';

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
