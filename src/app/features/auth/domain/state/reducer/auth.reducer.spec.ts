import { User } from '@shared/user.model';
import { AuthTab } from '../../entities/auth.model';
import * as fromActions from '../actions/auth.actions';
import * as fromReducer from '../reducer/auth.reducer';

describe('GIVEN: Auth Reducer', () => {
  const { authInitialState } = fromReducer;
  const mockUserResponse: User = {
    id: 123,
    email: 'test@example.com',
    name: 'Juan',
    lastName: 'Perez',
    password: '1234abcd',
  };

  describe('WHEN: viewInitialisedSucceeded', () => {
    it('THEN: should update state', () => {
      const mockDefaultTab = AuthTab.LOGIN;
      const action = fromActions.AuthViewActions.viewInitialisedSucceeded({
        defaultSelectedTab: mockDefaultTab,
      });

      const newState = fromReducer.authReducerFunction(
        authInitialState,
        action
      );

      expect(newState.defaultSelectedTab).toEqual(mockDefaultTab);
    });
  });
  describe('WHEN: loginSuccess', () => {
    it('THEN: should update state', () => {
      const action = fromActions.LoginViewActions.loginSuccess({
        authenticationUser: mockUserResponse,
      });

      const newState = fromReducer.authReducerFunction(
        authInitialState,
        action
      );

      expect(newState.user).toEqual(mockUserResponse);
    });
  });
  describe('WHEN: registerSuccess', () => {
    it('THEN: should update state', () => {
      const action = fromActions.RegisterViewActions.registerSuccess({
        authenticationUser: mockUserResponse,
      });

      const newState = fromReducer.authReducerFunction(
        authInitialState,
        action
      );

      expect(newState.user).toEqual(mockUserResponse);
    });
  });
  describe('WHEN: setRequestedPath', () => {
    it('THEN: should update state', () => {
      const mockRequestedPath = '/dahsboard';
      const action = fromActions.RequestedPathActions.setRequestedPath({
        requestedPath: mockRequestedPath,
      });

      const newState = fromReducer.authReducerFunction(
        authInitialState,
        action
      );

      expect(newState.requestedPath).toEqual(mockRequestedPath);
    });
  });
});
