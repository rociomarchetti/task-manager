import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/user.model';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private storageKey = 'fake_users';
  private tokenKey = 'fake_token';

  private loggedIn$ = new BehaviorSubject<boolean>(this.isLoggedInSync());

  private users: Array<User> = JSON.parse(
    localStorage.getItem(this.storageKey) || '[]'
  );

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  register(newUser: User): Observable<boolean> {
    const exists = this.users.find((u) => u.email === newUser.email);

    if (exists) {
      return of(false).pipe(delay(500));
    }

    this.users.push(newUser);
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    return of(true).pipe(delay(500));
  }

  login(currentUser: User): Observable<boolean> {
    const user = this.users.find(
      (u) =>
        u.email === currentUser.email && u.password === currentUser.password
    );

    if (user) {
      const fakeToken = btoa(
        JSON.stringify({
          username: currentUser.email,
          exp: Date.now() + 3600000, // expira en 1h
        })
      );
      localStorage.setItem(this.tokenKey, fakeToken);

      this.loggedIn$.next(true);

      return of(true).pipe(delay(500));
    }

    return of(false).pipe(delay(500));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  private isLoggedInSync(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
