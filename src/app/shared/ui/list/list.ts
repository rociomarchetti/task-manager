import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
  listItems = input<Array<unknown>>([]);
  variant = input<'one' | 'two'>('one');
  emptyStateMssg = input<string>();

  @HostBinding('class')
  get hostClasses(): string {
    return `list list--${this.variant()}`;
  }
}
