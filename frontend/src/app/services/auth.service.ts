import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  username = signal<string>('');

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem('username');
    if (savedUser && this.getToken()) {
      this.username.set(savedUser);
    }
  }

  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', username);
          this.username.set(username);
        })
      );
  }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  getProfile() {
    return this.http.get<{ id: number; username: string }>(`${this.apiUrl}/profile`);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.username.set('');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
