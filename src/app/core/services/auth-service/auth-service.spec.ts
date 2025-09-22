import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth-service';
import { inject } from '@angular/core';

jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');
  return {
    ...actual,
    inject: jest.fn(),
  };
});

describe('AuthService', () => {
  let service: AuthService;

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

  it('should register a new member', async () => {
    const user = { username: 'test', password: '1234' };

    const result = await firstValueFrom(service.register(user));

    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'fake_users',
      JSON.stringify([user])
    );
  });

  it('should not register if member exists', async () => {
    const user = { username: 'test', password: '1234' };
    await firstValueFrom(service.register(user));

    const result = await firstValueFrom(service.register(user));

    expect(result).toBe(false);
  });

  it('should log in a valid user', async () => {
    const user = { username: 'test', password: '1234' };
    await firstValueFrom(service.register(user));

    const result = await firstValueFrom(service.login(user));

    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'fake_token',
      expect.any(String)
    );
  });

  it('should not log in an invalid user', async () => {
    const result = await firstValueFrom(
      service.login({ username: 'x', password: 'y' })
    );

    expect(result).toBe(false);
  });

  it('should log out and redirect to login', () => {
    localStorage.setItem('fake_token', '123');
    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('fake_token');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return loggedIn observable', async () => {
    const user = { username: 'test', password: '1234' };
    await firstValueFrom(service.register(user));
    await firstValueFrom(service.login(user));

    const isLogged = await firstValueFrom(service.isLoggedIn());
    expect(isLogged).toBe(true);
  });
});
