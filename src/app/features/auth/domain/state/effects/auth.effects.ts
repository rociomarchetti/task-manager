import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/auth.actions';
import { AuthService } from 'app/core/services/auth-service/auth-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private readonly actions = inject(Actions);
  private readonly authenticationService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  /*   viewInitialised$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.AuthViewActions.viewInitialised),
      withLatestFrom(this.store.select(getQueryParams)),
      map(() => {
        const defaultSelectedTab = AuthTab.LOGIN;
     if (
          queryParams?.[AuthQueryParams.INVITATION_CODE] &&
          queryParams?.[AuthQueryParams.EMAIL]
        ) {
          defaultSelectedTab = AuthTab.SIGN_UP;
        } 
        return fromActions.AuthViewActions.viewInitialisedSucceeded({
          defaultSelectedTab,
        });
      })
    )
  ); */

  login$ = createEffect(() => {
    return this.actions.pipe(
      ofType(fromActions.LoginViewActions.login),
      exhaustMap((action) =>
        this.authenticationService.login(action.loginRequest).pipe(
          map((authResponse) => {
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
            return fromActions.RegisterViewActions.registerSuccess({
              authenticationUser: authResponse.user,
            });
          }),
          catchError(() => {
            return of(fromActions.RegisterViewActions.registerError());
          })
        )
      )
    );
  });

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
