import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthFacade } from 'app/features/auth/domain/application/auth.facade';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly authFacade = inject(AuthFacade);
  readonly viewModel$ = this.authFacade.viewModel$;

  logout() {
    this.authFacade.logout();
  }
}
