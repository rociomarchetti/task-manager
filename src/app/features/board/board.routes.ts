import { Routes } from '@angular/router';

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
      //BoardFacade,
      //provideState(boardFeatureKey, boardReducer),
      //provideEffects([BoardEffects]),
    ],
  },
];
