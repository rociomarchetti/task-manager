import { LoginRequest } from './../entities/auth.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthFacade } from './auth.facade';
import { TestBed } from '@angular/core/testing';
import { provideZoneChangeDetection } from '@angular/core';
import * as fromActions from '../state/actions/auth.actions';
import { RegisterRequest } from '../entities/auth.model';

describe('GIVEN: Authentication Facade', () => {
  let store: MockStore;
  let facade: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        provideMockStore(),
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    facade = TestBed.inject(AuthFacade);
  });

  describe('WHEN: log in', () => {
    it('THEN: should dispatch view signedIn action', () => {
      const loginRequestMock: LoginRequest = {
        email: 'test@mail.com',
        password: '1234',
      };
      const action = fromActions.LoginViewActions.login({
        loginRequest: loginRequestMock,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.login(loginRequestMock);

      expect(result).toHaveBeenCalledWith(action);
    });
  });
  describe('WHEN: register', () => {
    it('THEN: should dispatch view register action', () => {
      const registerRequestMock: RegisterRequest = {
        email: 'test@mail.com',
        password: '1234',
        name: 'John',
        lastName: 'Doe',
      };
      const action = fromActions.RegisterViewActions.register({
        registerRequest: registerRequestMock,
      });
      const result = jest.spyOn(store, 'dispatch');

      facade.register(registerRequestMock);

      expect(result).toHaveBeenCalledWith(action);
    });
  });

  describe('WHEN: logout', () => {
    it('THEN: should dispatch view register action', () => {
      const action = fromActions.LogoutViewActions.logout();
      const result = jest.spyOn(store, 'dispatch');

      facade.logout();

      expect(result).toHaveBeenCalledWith(action);
    });
  });
});
