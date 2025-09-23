import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from '../ui-login-form/login-form';

@Component({
  selector: 'app-auth',
  imports: [LoginFormComponent, MatTabsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeature {}
