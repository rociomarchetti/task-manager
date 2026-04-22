import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
  listItems = input<Array<unknown>>([]);
  emptyStateMssg = input<string>();
}
