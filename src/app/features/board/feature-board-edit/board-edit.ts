import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board, NewTaskData } from '@shared/models';
import { FormMode } from '@shared/models/form-mode.model';
import { TaskModal } from 'app/features/shared/task-modal/task-modal';
import { BoardEditFacade } from '../domain/application/edit/board-edit.facade';
import { BoardFormComponent } from '../ui-board-form/board-form';

@Component({
  selector: 'app-board-edit',
  imports: [AsyncPipe, BoardFormComponent, TaskModal],
  templateUrl: './board-edit.html',
  styleUrl: './board-edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardEditFeature implements OnInit {
  private readonly boardEditFacade = inject(BoardEditFacade);
  readonly viewModel$ = this.boardEditFacade.viewModel$;

  private route = inject(ActivatedRoute);

  FormMode = FormMode;
  isModalOpen = signal(false);

  ngOnInit() {
    const boardId = this.route.snapshot.paramMap.get('id') ?? '';
    this.boardEditFacade.viewInitialised(boardId);
  }

  onModalClosed(): void {
    this.isModalOpen.set(false);
  }

  onAddTaskClicked(): void {
    this.isModalOpen.set(true);
  }

  onSaveBoardChanges(updatedBoard: Board): void {
    this.boardEditFacade.editBoard(updatedBoard);
  }

  onSaveNewTask(newTask: NewTaskData): void {
    this.boardEditFacade.addNewTask(newTask);
  }
}
