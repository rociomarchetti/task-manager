import { inject } from '@angular/core';
import {
  AuthResponse,
  RegisterRequest,
} from 'app/features/auth/domain/entities/auth.model';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth-service';
import { User } from '@shared/models';

jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');
  return {
    ...actual,
    inject: jest.fn(),
  };
});

describe('GIVEN: AuthService', () => {
  let service: AuthService;

  const authResponseMock: AuthResponse = {
    token:
      'eyJ1c2VySWQiOjIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImV4cCI6MTc2MDYwNzAwNDc5MX0=',
    user: {
      email: 'test@mail.com',
      id: 2,
      lastName: 'Doe',
      name: 'John',
      password: '1234',
    },
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    (inject as jest.Mock).mockReturnValue(routerMock);

    jest.spyOn(localStorage.__proto__, 'setItem');
    jest.spyOn(localStorage.__proto__, 'getItem');
    jest.spyOn(localStorage.__proto__, 'removeItem');

    service = new AuthService();
  });

  describe('WHEN: register', () => {
    const registerRequestMock: RegisterRequest = {
      email: 'test@mail.com',
      password: '1234',
      name: 'John',
      lastName: 'Doe',
    };
    it('THEN: should save the user in local storage', (done) => {
      const setItemLocalInStorage = localStorage.setItem;

      service.register(registerRequestMock).subscribe(() => {
        expect(setItemLocalInStorage).toHaveBeenCalledWith(
          'fake_users',
          expect.stringContaining(registerRequestMock.email)
        );

        done();
      });
    });

    it('THEN: should retrieve the user if it does not already exists', async () => {
      const result = await firstValueFrom(
        service.register(registerRequestMock)
      );

      expect(result).not.toBeNull();
      expect(result?.user).toEqual(
        expect.objectContaining(authResponseMock.user)
      );
    });

    it('THEN: should retrieve null if the user already exists', async () => {
      const mockAlreadyRegisteredUser: User = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        name: 'John',
        lastName: 'Doe',
      };
      const result = await firstValueFrom(
        service.register(mockAlreadyRegisteredUser)
      );

      expect(result).toBe(null);
    });

    it('THEN: should call the startSession private method', (done) => {
      const startSessionSpy = jest.spyOn(service as any, 'startSession');

      service.register(registerRequestMock).subscribe(() => {
        expect(startSessionSpy).toHaveBeenCalledWith(
          expect.objectContaining(authResponseMock.user)
        );

        done();
      });
    });
  });

  describe('WHEN: login', () => {
    const loginRequestMock = {
      email: 'test@example.com',
      password: '123456',
    };
    it('THEN: should retrieve the user if it is a registered one', async () => {
      const result = await firstValueFrom(service.login(loginRequestMock));

      expect(result).not.toBeNull();
      expect(result?.user).toEqual(
        expect.objectContaining({ email: 'test@example.com' })
      );
    });

    it('THEN: should retrieve null if the user is not registered', async () => {
      const result = await firstValueFrom(
        service.login({ email: 'test@mail.com', password: '123' })
      );

      expect(result).toBe(null);
    });

    it('THEN: should call the startSession private method', (done) => {
      const startSessionSpy = jest.spyOn(service as any, 'startSession');

      service.login(loginRequestMock).subscribe(() => {
        expect(startSessionSpy).toHaveBeenCalledWith(
          expect.objectContaining(loginRequestMock)
        );

        done();
      });
    });
  });

  describe('WHEN: logout', () => {
    it('THEN: should remove the user from local storage', () => {
      const tokenKey = 'fake_token';
      const currentUserKey = '123';

      localStorage.setItem(tokenKey, currentUserKey);
      service.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith(tokenKey);
    });

    it('THEN: should set loggedIn$ to false', () => {
      (service as any).loggedIn$.next(true);

      service.logout();

      expect((service as any).loggedIn$.getValue()).toBe(false);
    });

    it('THEN: should redirect to auth', () => {
      const url = '/auth';
      const routerNavigate = routerMock.navigate;

      service.logout();

      expect(routerNavigate).toHaveBeenCalledWith([url]);
    });
  });

  describe('WHEN: getCurrentUser', () => {
    const currentUserMock: User = {
      id: 1,
      email: 'test@example.com',
      password: '123456',
      name: 'John',
      lastName: 'Doe',
    };

    it('THEN: should retrieve the current user if token is valid', async () => {
      localStorage.setItem(
        'fake_current_user',
        JSON.stringify(currentUserMock)
      );
      jest.spyOn(service, 'isLoggedInSync').mockReturnValue(true);

      const result = await firstValueFrom(service.getCurrentUser());

      expect(result).toEqual(currentUserMock);
    });

    it('THEN: should retrieve null if there is no user in local storage', async () => {
      jest.spyOn(service, 'isLoggedInSync').mockReturnValue(true);

      const result = await firstValueFrom(service.getCurrentUser());

      expect(result).toBeNull();
    });

    it('THEN: should retrieve null if token is invalid', async () => {
      localStorage.setItem(
        'fake_current_user',
        JSON.stringify(currentUserMock)
      );

      jest.spyOn(service, 'isLoggedInSync').mockReturnValue(false);

      const result = await firstValueFrom(service.getCurrentUser());

      expect(result).toBeNull();
    });
  });

  describe('WHEN: isLoggedInSync', () => {
    it('THEN: should return false if token does not exist', () => {
      const result = service.isLoggedInSync();

      expect(result).toBe(false);
    });

    it('THEN: should return true if token is valid', () => {
      const validToken = btoa(
        JSON.stringify({
          userId: 1,
          email: 'test@example.com',
          exp: Date.now() + 10000,
        })
      );

      localStorage.setItem('fake_token', validToken);

      const result = service.isLoggedInSync();

      expect(result).toBe(true);
    });

    it('THEN: should return false and call logout if token is expired', () => {
      const expiredToken = btoa(
        JSON.stringify({
          userId: 1,
          email: 'test@example.com',
          exp: Date.now() - 10000,
        })
      );

      localStorage.setItem('fake_token', expiredToken);
      const logoutSpy = jest.spyOn(service, 'logout');

      const result = service.isLoggedInSync();

      expect(result).toBe(false);
      expect(logoutSpy).toHaveBeenCalled();
    });

    it('THEN: should return false if token is invalid', () => {
      localStorage.setItem('fake_token', 'invalid-token');

      const result = service.isLoggedInSync();

      expect(result).toBe(false);
    });
  });
});
