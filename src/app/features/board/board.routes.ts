import { Routes } from '@angular/router';
import { BoardFacade } from './domain/application/board.facade';
import { boardFeatureKey } from './domain/state/state/board.state';
import { BoardEffects, boardReducerFunction } from './domain';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const BOARD_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./feature-board-create/board-create').then(
        (m) => m.BoardCreateFeature
      ),
    providers: [
      //BoardFacade,
      //provideState(boardFeatureKey, boardReducer),
      //provideEffects([BoardEffects]),
    ],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./feature-board-edit/board-edit').then((m) => m.BoardEditFeature),
    providers: [
      BoardFacade,
      provideState(boardFeatureKey, boardReducerFunction),
      provideEffects([BoardEffects]),
    ],
  },
];
