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
    const task = this.getTask(taskId);

    task.status = TaskStatus.DONE;
    task.updatedAt = new Date();

    this.updateTaskList(task);
    this.saveTasks();
    return of(task);
  }

  postponeTask(taskId: string, days: number): Observable<Task | null> {
    const task = this.getTask(taskId);

    const newDueDate = new Date(task.dueDate);
    newDueDate.setDate(newDueDate.getDate() + days);

    task.dueDate = newDueDate;
    task.updatedAt = new Date();

    this.updateTaskList(task);
    this.saveTasks();
    return of(task);
  }

  private getTask(taskId: string): Task | null {
    const taskIndex = this.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return null;
    }

    const originalTask = this.tasks[taskIndex];

    if (!originalTask.dueDate) {
      return null;
    }

    return { ...originalTask };
  }

  private updateTaskList(updatedTask: Task): void {
    const taskIndex = this.tasks.findIndex((t) => t.id === updatedTask.id);
    this.tasks = [
      ...this.tasks.slice(0, taskIndex),
      updatedTask,
      ...this.tasks.slice(taskIndex + 1),
    ];
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
