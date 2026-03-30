import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BoardListFacade } from '../domain/application/board-list.facade';
import { BoardListList } from '../ui-list/board-list-list';
import { BoardListTopActionBar } from '../ui-top-action-bar/board-list-top-action-bar';

@Component({
  selector: 'app-board-list',
  imports: [AsyncPipe, BoardListList, BoardListTopActionBar],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListFeature implements OnInit {
  private readonly boardListFacade = inject(BoardListFacade);
  readonly viewModel$ = this.boardListFacade.viewModel$;

  filtersChanged = signal<{ search: string; favorites: boolean } | null>(null);

  ngOnInit(): void {
    this.boardListFacade.viewInitialised();
  }

  onCreateBoard(): void {
    this.boardListFacade.createNewBoard();
  }

  onSearchBoardUpdated(event: { search: string; favorites: boolean }): void {
    this.filtersChanged.set(event);
  }
}
