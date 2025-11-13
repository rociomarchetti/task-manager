import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  imports: [],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskModal {}
