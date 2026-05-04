import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list',
  imports: [MatProgressSpinnerModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
  listItems = input<Array<unknown>>([]);
  emptyStateMssg = input<string>();
  loading = input<boolean | null>(null);

  mode: ProgressSpinnerMode = 'indeterminate';
}
