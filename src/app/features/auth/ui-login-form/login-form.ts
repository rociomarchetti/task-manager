import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRequest } from '../domain/entities/auth.model';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginFormComponent {
  loginRequested = output<LoginRequest>();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>('test@example.com', [
      Validators.required,
    ]),
    password: new FormControl<string | null>('123456', [Validators.required]),
  });

  onLogin(): void {
    const userData: LoginRequest = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    this.loginRequested.emit(userData);
  }
}
