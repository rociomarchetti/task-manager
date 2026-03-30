import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Board } from '@shared/models';
import { Panel } from '@shared/ui/panel/panel';
import { PanelBodyDirective } from '@shared/ui/panel/panel.directive';

@Component({
  selector: 'app-board-list-list',
  imports: [Panel, PanelBodyDirective],
  templateUrl: './board-list-list.html',
  styleUrl: './board-list-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListList {
  boards = input<Board[]>([]);
  filters = input<{ search: string; favorites: boolean } | null>(null);

  boardsToShow = computed(() => {
    const { search, favorites } = this.filters() ?? {
      search: '',
      favorites: false,
    };
    const all = this.boards() ?? [];

    const base = favorites ? all.filter((b) => b.isFavorite) : all;

    return base.filter((b) => b.title.toLowerCase().includes(search));
  });
}
