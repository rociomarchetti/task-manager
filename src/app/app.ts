import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromActions from './features/auth/domain/state/actions/auth.actions';
import { Snackbar } from './core/layout/snackbar/snackbar';

@Component({
  imports: [Snackbar, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'task-manager';
  private readonly store = inject(Store);

  ngOnInit(): void {
    const storedUser = localStorage.getItem('fake_current_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.store.dispatch(
        fromActions.LoginViewActions.loginSuccess({ authenticationUser: user })
      );
    }
  }
}
