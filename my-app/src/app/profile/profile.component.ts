import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" style="text-align: center;">
      <div class="avatar">
        {{ getInitials() }}
      </div>
      <h2 class="profile-name">{{ user?.name }}</h2>
      <p class="profile-email">{{ user?.email }}</p>
      
      <button (click)="logout()" style="margin-top: 2rem;">Logout</button>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  user: { name: string, email: string } | null = null;

  ngOnInit() {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  getInitials(): string {
    if (!this.user) return '';
    const nameInitial = this.user.name.charAt(0).toUpperCase();
    const emailInitial = this.user.email.charAt(0).toUpperCase();
    return `${nameInitial}${emailInitial}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
