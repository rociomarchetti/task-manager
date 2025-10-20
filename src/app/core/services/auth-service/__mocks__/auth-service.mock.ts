import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from 'app/features/auth/domain/entities/auth.model';
import { Observable, of } from 'rxjs';

export class AuthServiceMock {
  mockResponse: AuthResponse = {
    token: 'fake-token',
    user: {
      id: 123,
      email: 'test@example.com',
      name: 'Juan',
      lastName: 'Perez',
      password: '1234abcd',
    },
  };

  register(newUser: RegisterRequest): Observable<AuthResponse | null> {
    return of(this.mockResponse);
  }

  login(currentUser: LoginRequest): Observable<AuthResponse | null> {
    return of(this.mockResponse);
  }

  logout(): void {
    /* empty */
  }
}
