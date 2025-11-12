import { Component, inject } from '@angular/core';
import { AuthFacade } from 'app/features/auth/domain/application/auth.facade';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly authFacade = inject(AuthFacade);

  logout() {
    this.authFacade.logout();
  }
}
