import { NewTaskData, Task, UserTasksSummary } from '@shared/models';
import { Observable, of } from 'rxjs';

export class TasksServiceMock {
  getTasksForUser(userId: number): Observable<UserTasksSummary> {
    return of({} as UserTasksSummary);
  }

  getTasksByBoardId(boardId: string): Observable<Array<Task>> {
    return of([{} as Task]);
  }

  addTask(newTask: NewTaskData, userId: number): Observable<Task> {
    return of({} as Task);
  }

  markTaskAsDone(taskId: string): Observable<Task | null> {
    return of({} as Task);
  }

  postponeTask(taskId: string, days: number): Observable<Task | null> {
    return of({} as Task);
  }

  updateTask(updatedTask: Task): Observable<Task | null> {
    return of({} as Task);
  }

  removeTask(taskId: string): Observable<null> {
    return of(null);
  }
}
