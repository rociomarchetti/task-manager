import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Modal } from '@shared/ui/modal/modal';

@Component({
  selector: 'app-confirmation-modal',
  imports: [Modal, MatButtonModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModal {
  isModalOpen = input<boolean>(false);
  elementTitle = input<string>();
  elementType = input<'task' | 'board'>();

  modalClosed = output<void>();
  actionConfirmed = output<void>();

  get modalMessage(): string {
    const isTaskType = this.elementType() === 'task';
    return `¿Estás seguro de quieres eliminar ${
      isTaskType ? 'esta tarea' : 'este tablero'
    }?`;
  }

  onCloseModal(): void {
    this.modalClosed.emit();
  }

  onConfirmAction(): void {
    this.actionConfirmed.emit();
  }

  onCancelAction(): void {
    this.modalClosed.emit();
  }
}
