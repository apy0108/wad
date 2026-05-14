import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card">
      <h2>Welcome back</h2>
      <div *ngIf="showSuccessBanner" class="success-banner">
        Account created! Please log in.
      </div>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input type="email" formControlName="email" placeholder="Email" />
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="error">
            <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
            <span *ngIf="loginForm.get('email')?.errors?.['email']">Invalid email format</span>
          </div>
        </div>
        
        <div class="form-group">
          <input type="password" formControlName="password" placeholder="Password" />
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error">
            <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
          </div>
        </div>

        <div *ngIf="loginError" class="error" style="margin-bottom: 12px; text-align: center;">
          {{ loginError }}
        </div>
        
        <button type="submit">Login</button>
      </form>
      <div class="link-container">
        <a routerLink="/register">Don't have an account? Register</a>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loginError: string | null = null;
  showSuccessBanner = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.showSuccessBanner = true;
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);

    if (success) {
      this.router.navigate(['/profile']);
    } else {
      this.loginError = 'Invalid email or password';
    }
  }
}
