import { Injectable } from '@angular/core';
import {
  Task,
  TaskStatus,
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

  markTaskAsDone(taskId: string): Observable<Task | null> {
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) return null;

    task.status = TaskStatus.DONE;
    task.updatedAt = new Date();

    this.saveTasks();
    return of(task);
  }

  postponeTask(taskId: string, days: number): Observable<Task | null> {
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task || !task.dueDate) return null;

    const newDueDate = new Date(task.dueDate);
    newDueDate.setDate(newDueDate.getDate() + days);

    task.dueDate = newDueDate;
    task.updatedAt = new Date();

    this.saveTasks();
    return of(task);
  }

  private saveTasks(): void {
    localStorage.setItem(this.tasksStorageKey, JSON.stringify(this.tasks));
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
