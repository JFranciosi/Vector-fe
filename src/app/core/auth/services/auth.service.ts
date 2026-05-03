import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('jwt_token', response.token);
          localStorage.setItem('user', JSON.stringify({
            username: response.username,
            name: response.name,
            surname: response.surname
          }));
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
      },
      error: () => {
        // Anche se l'API fallisce, puliamo il localstorage per sicurezza
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
      }
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
}
