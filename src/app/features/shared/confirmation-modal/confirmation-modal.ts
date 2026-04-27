import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  imports: [],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModal {}
