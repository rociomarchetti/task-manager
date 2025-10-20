import { AuthViewModel } from './../../entities/auth-view.model';
import { User } from '@shared/user.model';
import { AuthTab, AuthTabsIndex } from '../../entities/auth.model';
import { AuthState } from '../state/auth.state';
import * as fromSelectors from '../selectors/auth.selectors';

describe('GIVEN: Auth Selectors', () => {
  let mockState: AuthState;

  beforeEach(() => {
    mockState = {
      defaultSelectedTab: AuthTab.LOGIN,
      requestedPath: '/dashboard',
      user: {} as User,
    };
  });

  describe('WHEN: view is initialised', () => {
    it('THEN: should return the view model', () => {
      const expected: AuthViewModel = {
        defaultSelectedTab: AuthTabsIndex[mockState.defaultSelectedTab],
        requestedPath: mockState.requestedPath,
        user: mockState.user,
      };
      const result = fromSelectors.selectAuthViewModel.projector(mockState);

      expect(result).toEqual(expected);
    });
  });
});
