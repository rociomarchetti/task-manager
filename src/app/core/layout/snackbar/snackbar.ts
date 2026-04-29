import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from 'app/core/services/notification-service/notification-service';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Snackbar {
  notification = inject(NotificationService);
}
