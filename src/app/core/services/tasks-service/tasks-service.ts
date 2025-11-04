import { Injectable } from '@angular/core';
import {
  Task,
  UserTasksSummary,
} from 'app/features/dashboard/domain/entities/dashboard.model';
import { delay, Observable, of } from 'rxjs';
import { mockTasks } from './__mocks__/mock-tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksStorageKey = 'fake_tasks';
  private tasks: Task[] = this.seedTasks();

  getTasksForUser(userId: number): Observable<UserTasksSummary> {
    const userTasks = this.tasks.filter((t) => t.userId === userId);

    const summary: UserTasksSummary = {
      userId,
      tasks: userTasks,
    };

    return of(summary).pipe(delay(500));
  }

  private seedTasks(): Task[] {
    const stored = localStorage.getItem(this.tasksStorageKey);
    if (stored) {
      return JSON.parse(stored);
    }

    localStorage.setItem(this.tasksStorageKey, JSON.stringify(mockTasks));
    return mockTasks;
  }
}
