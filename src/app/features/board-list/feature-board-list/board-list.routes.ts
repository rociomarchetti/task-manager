import { Routes } from '@angular/router';
import { BoardListFacade } from '../domain/application/board-list.facade';
import { boardListFeatureKey } from '../domain/state/state/board-list.state';
import { BoardListEffects, boardListReducerFunction } from '../domain/state';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const BOARD_LIST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./board-list').then((m) => m.BoardListFeature),
    providers: [
      BoardListFacade,
      provideState(boardListFeatureKey, boardListReducerFunction),
      provideEffects([BoardListEffects]),
    ],
  },
];
