import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  register(name: string, email: string, password: string): boolean {
    const existing = localStorage.getItem('registeredUser');
    if (existing) {
      const user = JSON.parse(existing);
      if (user.email === email) {
        return false;
      }
    }
    localStorage.setItem('registeredUser', JSON.stringify({ name, email, password }));
    return true;
  }

  login(email: string, password: string): boolean {
    const existing = localStorage.getItem('registeredUser');
    if (existing) {
      const user = JSON.parse(existing);
      if (user.email === email && user.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }));
        return true;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

  getUser(): { name: string, email: string } | null {
    const existing = localStorage.getItem('loggedInUser');
    if (existing) {
      return JSON.parse(existing);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }
}
