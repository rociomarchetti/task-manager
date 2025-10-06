import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/user.model';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from 'app/features/auth/domain/entities/auth.model';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private storageKey = 'fake_users';
  private tokenKey = 'fake_token';
  private currentUserKey = 'fake_current_user';

  private loggedIn$ = new BehaviorSubject<boolean>(this.isLoggedInSync());

  private users: Array<User> = this.seedUsers();

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  register(newUser: RegisterRequest): Observable<AuthResponse | null> {
    const userExists = this.users.find((u) => u.email === newUser.email);

    if (userExists) {
      return of(null).pipe(delay(500));
    }

    const newId = this.generateUserId();

    const user: User = {
      id: newId,
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      lastName: newUser.lastName,
    };

    this.users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));

    return of(this.startSession(user)).pipe(delay(500));
  }

  login(currentUser: LoginRequest): Observable<AuthResponse | null> {
    const user = this.users.find(
      (u) =>
        u.email === currentUser.email && u.password === currentUser.password
    );

    return of(user ? this.startSession(user) : null).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem(this.currentUserKey);
    const token = this.getToken();

    if (userStr && token) {
      return {
        user: JSON.parse(userStr),
        token,
      };
    }
    return null;
  }

  isLoggedInSync(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp > Date.now()) {
        return true;
      } else {
        this.logout();
        return false;
      }
    } catch {
      return false;
    }
  }

  private startSession(user: User): AuthResponse {
    const token = this.generateToken(user);
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    this.loggedIn$.next(true);
    return { token, user };
  }

  private seedUsers(): Array<User> {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) return JSON.parse(stored);

    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      password: '123456',
      name: 'John',
      lastName: 'Doe',
    };

    localStorage.setItem(this.storageKey, JSON.stringify([mockUser]));
    return [mockUser];
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private generateToken(user: User): string {
    return btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Date.now() + 3600000, // expira en 1h
      })
    );
  }

  private generateUserId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
  }
}
