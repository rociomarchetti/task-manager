import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BoardFormComponent } from '../ui-board-form/board-form';
import { ActivatedRoute } from '@angular/router';
import { Board, Task, TaskStatus } from '@shared/models';
import { BoardsService } from 'app/core/services/boards-service/boards-service';
import { TasksService } from 'app/core/services/tasks-service/tasks-service';

@Component({
  selector: 'app-board-edit',
  imports: [BoardFormComponent],
  templateUrl: './board-edit.html',
  styleUrl: './board-edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardEditFeature implements OnInit {
  private route = inject(ActivatedRoute);
  private readonly boardsService = inject(BoardsService);
  private readonly tasksService = inject(TasksService);

  currentBoard = signal<Board | null>(null);
  taskLists = signal<{
    pending: Array<Task>;
    inProgress: Array<Task>;
    completed: Array<Task>;
  }>({ pending: [], inProgress: [], completed: [] });

  tasksByStatus = (tasks: Task[]) => ({
    pending: tasks?.filter((t) => t.status === TaskStatus.PENDING),
    inProgress: tasks?.filter((t) => t.status === TaskStatus.IN_PROGRESS),
    completed: tasks?.filter((t) => t.status === TaskStatus.DONE),
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.boardsService
      .getBoardById(id)
      .subscribe((board) => this.currentBoard.set(board));
    this.tasksService.getTasksByBoardId(id).subscribe((tasks) => {
      const filteredByStatus = this.tasksByStatus(tasks);
      this.taskLists.set(filteredByStatus);
    });
  }
}
