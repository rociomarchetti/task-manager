import { AuthService } from 'app/core/services/auth-service/auth-service';
import { AuthEffects } from './auth.effects';
import { Action, ActionsSubject } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { provideZoneChangeDetection } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthServiceMock } from 'app/core/services/auth-service/__mocks__/auth-service.mock';
import * as fromActions from '../actions/auth.actions';
import {
  AuthResponse,
  AuthTab,
  LoginRequest,
  RegisterRequest,
} from '../../entities/auth.model';
import { of, throwError } from 'rxjs';

describe('GIVEN: Auth Effects', () => {
  let effects: AuthEffects;
  let service: AuthService;
  let actions$: ActionsSubject;
  let navigateSpy: jest.SpyInstance;

  beforeEach(() => {
    navigateSpy = jest.spyOn(Router.prototype, 'navigate');
    TestBed.configureTestingModule({
      providers: [
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
        AuthEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: AuthService, useClass: AuthServiceMock },
        {
          provide: Router,
          useValue: { navigate: navigateSpy, navigateByUrl: jest.fn() },
        },
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
    effects = TestBed.inject(AuthEffects);
    service = TestBed.inject(AuthService);
  });

  const mockResponse: AuthResponse = {
    token: 'fake-token',
    user: {
      id: 123,
      email: 'test@example.com',
      name: 'Jhon',
      lastName: 'Doe',
      password: '1234abcd',
    },
  };

  describe('WHEN: viewInitialised', () => {
    it('THEN: should dispatch on success', () => {
      const result: Action[] = [];
      const action = fromActions.AuthViewActions.viewInitialised();
      const mockDefaultTab = AuthTab.LOGIN;
      const expected = fromActions.AuthViewActions.viewInitialisedSucceeded({
        defaultSelectedTab: mockDefaultTab,
      });

      effects.viewInitialised$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });

  describe('WHEN: login', () => {
    const loginRequestMock: LoginRequest = {
      email: 'test@example.com',
      password: '1234abcd',
    };
    it('THEN: should call the service', () => {
      const result: Action[] = [];
      const action = fromActions.LoginViewActions.login({
        loginRequest: loginRequestMock,
      });
      const spy = jest.spyOn(service, 'login');

      effects.login$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(spy).toHaveBeenCalled();
    });
    it('THEN: should dispatch on success', () => {
      const result: Action[] = [];
      const action = fromActions.LoginViewActions.login({
        loginRequest: loginRequestMock,
      });
      const expected = fromActions.LoginViewActions.loginSuccess({
        authenticationUser: mockResponse.user,
      });
      jest.spyOn(service, 'login').mockImplementation(() => of(mockResponse));

      effects.login$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
    it('THEN: should dispatch on error', () => {
      const result: Action[] = [];
      const action = fromActions.LoginViewActions.login({
        loginRequest: loginRequestMock,
      });
      const errMsg = 'error';
      const expected = fromActions.LoginViewActions.loginError({
        error: errMsg,
      });
      jest
        .spyOn(service, 'login')
        .mockImplementation(() => throwError(() => 'error'));

      effects.login$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });

  describe('WHEN: register', () => {
    const registerRequestMock: RegisterRequest = {
      email: 'test@example.com',
      name: 'Jhon',
      lastName: 'Doe',
      password: '1234abcd',
    };
    it('THEN: should call the service', () => {
      const result: Action[] = [];
      const action = fromActions.RegisterViewActions.register({
        registerRequest: registerRequestMock,
      });
      const spy = jest.spyOn(service, 'register');

      effects.register$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(spy).toHaveBeenCalled();
    });
    it('THEN: should dispatch on success', () => {
      const result: Action[] = [];
      const action = fromActions.RegisterViewActions.register({
        registerRequest: registerRequestMock,
      });
      const expected = fromActions.RegisterViewActions.registerSuccess({
        authenticationUser: mockResponse.user,
      });
      jest
        .spyOn(service, 'register')
        .mockImplementation(() => of(mockResponse));

      effects.register$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
    it('THEN: should dispatch on error', () => {
      const result: Action[] = [];
      const action = fromActions.RegisterViewActions.register({
        registerRequest: registerRequestMock,
      });
      const errMsg = 'error';
      const expected = fromActions.RegisterViewActions.registerError({
        error: errMsg,
      });
      jest
        .spyOn(service, 'register')
        .mockImplementation(() => throwError(() => 'error'));

      effects.register$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });

  describe('WHEN: logout', () => {
    it('THEN: should dispatch on success', () => {
      const result: Action[] = [];
      const action = fromActions.LogoutViewActions.logout();
      const expected = fromActions.LogoutViewActions.logoutSuccess();

      effects.logout$.subscribe((res) => {
        result.push(res);
      });
      actions$.next(action);

      expect(result).toEqual([expected]);
    });
  });
});
