import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from '../ui-login-form/login-form';
import { RegisterFormComponent } from '../ui-register-form/register-form';
import { AuthFacade } from '../domain/application/auth.facade';
import { LoginRequest, RegisterRequest } from '../domain/entities/auth.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    AsyncPipe,
    LoginFormComponent,
    MatTabsModule,
    RegisterFormComponent,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeature implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  readonly viewModel$ = this.authFacade.viewModel$;

  ngOnInit(): void {
    this.authFacade.viewInitialised();
  }

  onLoginRequest(userData: LoginRequest): void {
    this.authFacade.login(userData);
  }

  onRegisterRequest(userData: RegisterRequest): void {
    this.authFacade.register(userData);
  }
}
