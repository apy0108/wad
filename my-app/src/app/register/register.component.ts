import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card">
      <h2>Create account</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input type="text" formControlName="name" placeholder="Name" />
          <div *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched" class="error">
            <span *ngIf="registerForm.get('name')?.errors?.['required']">Name is required</span>
            <span *ngIf="registerForm.get('name')?.errors?.['minlength']">Minimum 2 characters</span>
          </div>
        </div>
        
        <div class="form-group">
          <input type="email" formControlName="email" placeholder="Email" />
          <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="error">
            <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
            <span *ngIf="registerForm.get('email')?.errors?.['email']">Invalid email format</span>
          </div>
        </div>
        
        <div class="form-group">
          <input type="password" formControlName="password" placeholder="Password" />
          <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="error">
            <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
            <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Minimum 6 characters</span>
          </div>
        </div>

        <div *ngIf="registerError" class="error" style="margin-bottom: 12px; text-align: center;">
          {{ registerError }}
        </div>
        
        <button type="submit">Register</button>
      </form>
      <div class="link-container">
        <a routerLink="/login">Already have an account? Login</a>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerError: string | null = null;

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.registerForm.value;
    const success = this.authService.register(name, email, password);

    if (success) {
      this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
    } else {
      this.registerError = 'Email already registered';
    }
  }
}
