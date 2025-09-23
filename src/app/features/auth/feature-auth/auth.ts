import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from '../ui-login-form/login-form';
import { RegisterFormComponent } from '../ui-register-form/register-form';

@Component({
  selector: 'app-auth',
  imports: [LoginFormComponent, RegisterFormComponent, MatTabsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeature {}
