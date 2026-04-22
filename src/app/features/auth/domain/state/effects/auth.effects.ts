import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/auth.actions';
import { AuthService } from 'app/core/services/auth-service/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, exhaustMap, map, of, switchMap, take, tap } from 'rxjs';
import { AuthQueryParams, AuthTab } from '../../entities/auth.model';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../selectors/auth.selectors';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class AuthEffects {
  private readonly actions = inject(Actions);
  private readonly authenticationService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  viewInitialised$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.AuthViewActions.viewInitialised),
      switchMap(() =>
        this.route.queryParams.pipe(
          take(1),
          map((queryParams) => {
            let defaultSelectedTab = AuthTab.LOGIN;
            if (
              queryParams?.[AuthQueryParams.INVITATION_CODE] &&
              queryParams?.[AuthQueryParams.EMAIL]
            ) {
              defaultSelectedTab = AuthTab.REGISTER;
            }

            return fromActions.AuthViewActions.viewInitialisedSucceeded({
              defaultSelectedTab,
            });
          })
        )
      )
    )
  );

  login$ = createEffect(() => {
    return this.actions.pipe(
      ofType(fromActions.LoginViewActions.login),
      exhaustMap((action) =>
        this.authenticationService.login(action.loginRequest).pipe(
          map((authResponse) => {
            if (!authResponse) {
              throw new Error('Invalid credentials');
            }
            return fromActions.LoginViewActions.loginSuccess({
              authenticationUser: authResponse.user,
            });
          }),
          catchError((error) => {
            return of(
              fromActions.LoginViewActions.loginError({
                error,
              })
            );
          })
        )
      )
    );
  });

  register$ = createEffect(() => {
    return this.actions.pipe(
      ofType(fromActions.RegisterViewActions.register),
      exhaustMap((action) =>
        this.authenticationService.register(action.registerRequest).pipe(
          map((authResponse) => {
            if (!authResponse) {
              throw new Error('Invalid credentials');
            }
            return fromActions.RegisterViewActions.registerSuccess({
              authenticationUser: authResponse.user,
            });
          }),
          catchError((error) => {
            return of(
              fromActions.RegisterViewActions.registerError({
                error,
              })
            );
          })
        )
      )
    );
  });

  onAuthSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          fromActions.LoginViewActions.loginSuccess,
          fromActions.RegisterViewActions.registerSuccess
        ),
        concatLatestFrom(() => this.store.select(selectAuthState)),
        tap(([, state]) => {
          const path = state?.requestedPath;
          if (path) {
            this.router.navigate([`/${path}`]);
          } else {
            this.router.navigate(['/app/dashboard']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() => {
    return this.actions.pipe(
      ofType(fromActions.LogoutViewActions.logout),
      exhaustMap(() => {
        this.authenticationService.logout();
        return of(fromActions.LogoutViewActions.logoutSuccess());
      }),
      catchError(() => of(fromActions.LogoutViewActions.logoutError()))
    );
  });
}
