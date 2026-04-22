import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { mockTasks } from './__mocks__/mock-tasks';
import {
  NewTaskData,
  Task,
  TaskStatus,
  UserTasksSummary,
} from '@shared/models';

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

  getTasksByBoardId(boardId: string): Observable<Array<Task>> {
    const boardTasks = this.tasks.filter((t) => t.boardId === boardId);
    return of(boardTasks).pipe(delay(500));
  }

  addTask(newTask: NewTaskData, userId: number): Observable<Task> {
    const id = this.generateId();

    const taskToAdd: Task = {
      ...newTask,
      id,
      userId,
      status: newTask?.status ?? TaskStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks = [...this.tasks, taskToAdd];
    this.saveTasks();

    return of(taskToAdd).pipe(delay(500));
  }

  markTaskAsDone(taskId: string): Observable<Task | null> {
    const task = this.getTask(taskId);
    if (!task) {
      return of(null);
    }

    task.status = TaskStatus.DONE;
    task.updatedAt = new Date();

    this.updateTaskList(task);
    this.saveTasks();
    return of(task);
  }

  postponeTask(taskId: string, days: number): Observable<Task | null> {
    const task = this.getTask(taskId);
    if (!task) {
      return of(null);
    }

    const today = new Date();
    const newDueDate = new Date(task.dueDate ?? today);
    newDueDate.setDate(newDueDate.getDate() + days);

    task.dueDate = newDueDate;
    task.updatedAt = new Date();

    this.updateTaskList(task);
    this.saveTasks();
    return of(task);
  }

  updateTask(updatedTask: Task): Observable<Task | null> {
    const existingTask = this.getTask(updatedTask.id);
    if (!existingTask) {
      return of(null);
    }

    updatedTask.createdAt = existingTask.createdAt;
    updatedTask.updatedAt = new Date();

    this.updateTaskList(updatedTask);
    this.saveTasks();

    return of(updatedTask).pipe(delay(500));
  }

  removeTask(taskId: string): Observable<void> {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.saveTasks();
    return of(void 0);
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

  private generateId(): string {
    return crypto.randomUUID();
  }
}
