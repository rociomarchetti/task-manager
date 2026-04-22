import { AuthViewModel } from './../../entities/auth-view.model';
import { AuthTab, AuthTabsIndex } from '../../entities/auth.model';
import { AuthState } from '../state/auth.state';
import * as fromSelectors from '../selectors/auth.selectors';
import { User } from '@shared/models';

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
      const mockUser = {} as User;
      const expected: AuthViewModel = {
        defaultSelectedTab: mockState.defaultSelectedTab
          ? AuthTabsIndex[mockState.defaultSelectedTab]
          : AuthTabsIndex[AuthTab.LOGIN],
        requestedPath: mockState.requestedPath ?? '',
        user: mockUser,
        userInitials: '',
      };
      const result = fromSelectors.selectAuthViewModel.projector(
        mockState,
        mockUser
      );

      expect(result).toEqual(expected);
    });
  });
});
