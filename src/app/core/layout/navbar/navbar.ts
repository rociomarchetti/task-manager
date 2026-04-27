import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthFacade } from 'app/features/auth/domain/application/auth.facade';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '@shared/models';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly authFacade = inject(AuthFacade);
  readonly viewModel$ = this.authFacade.viewModel$;

  logout() {
    this.authFacade.logout();
  }

  getUserName(user: User): string {
    const message = `Hola ${user?.name} ${user?.lastName}`;
    return message;
  }
}
