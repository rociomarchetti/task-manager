import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Board, User, UserBoardsSummary } from '@shared/models';
import { BoardsServiceMock } from 'app/core/services/boards-service/__mocks__/boards-service.mock';
import { BoardsService } from 'app/core/services/boards-service/boards-service';
import { selectAuthenticatedUser } from 'app/features/auth/domain/state';
import { of, throwError } from 'rxjs';
import * as fromActions from '../actions/board-list.actions';
import { BoardListEffects } from './board-list.effects';

describe('GIVEN: Board List Effects', () => {
  let effects: BoardListEffects;
  let service: BoardsService;
  let actions$: ActionsSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
        BoardListEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: BoardsService, useClass: BoardsServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(''),
          },
        },
      ],
    });
  });

  beforeEach(() => {
    actions$ = new ActionsSubject();
    effects = TestBed.inject(BoardListEffects);
    service = TestBed.inject(BoardsService);
  });

  describe('WHEN: viewInitialised', () => {
    it('THEN: should dispatch on success', () => {
      const result: Action[] = [];
      const mockBoards = [{} as Board];
      const mockUser = {} as User;
      const store = TestBed.inject<MockStore>(MockStore);
      const boardSummaryMock: UserBoardsSummary = {
        userId: 123,
        boards: mockBoards,
      };
      const action = fromActions.BoardListViewActions.viewInitialised();
      const expected =
        fromActions.BoardListViewActions.viewInitialisedSucceeded({
          boards: mockBoards,
        });

      store.overrideSelector(selectAuthenticatedUser, mockUser);
      store.refreshState();
      jest
        .spyOn(service, 'getBoardsForUser')
        .mockReturnValue(of(boardSummaryMock));
      effects.viewInitialised$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });

  describe('WHEN: removeBoardClicked', () => {
    it('THEN: should dispatch removeBoardSucceeded on success', () => {
      const result: Action[] = [];
      const action = fromActions.BoardListViewActions.removeBoardClicked({
        boardId: 'board-123',
      });
      const mockBoards = [{} as Board];
      const expected = fromActions.BoardListViewActions.removeBoardSucceeded({
        boardsUpdatedList: mockBoards,
      });

      jest.spyOn(service, 'deleteBoard').mockReturnValue(of(mockBoards));
      effects.onRemoveBoard$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });

    it('THEN: should dispatch removeBoardError on failure', () => {
      const result: Action[] = [];
      jest
        .spyOn(service, 'deleteBoard')
        .mockReturnValue(throwError(() => new Error('error')));
      const action = fromActions.BoardListViewActions.removeBoardClicked({
        boardId: 'board-123',
      });
      const expected = fromActions.BoardListViewActions.removeBoardError();

      effects.onRemoveBoard$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });
});
