import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of , BehaviorSubject} from 'rxjs';
import { catchError, throwError} from 'rxjs';
import { Router } from '@angular/router'; 
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

// Define an interface for the login response
interface LoginResponse {
  message: string; // The success message returned from the server
  email: string;   // The email of the logged-in user (required)
  role?: string; 
  name?: string; 
  status: number;
  projectName: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //private apiUrl = 'https://localhost:7009/api/Auth';
  private apiUrl = 'https://loginapi.svlots.com/api/Auth';

  private userNameSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.userNameSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  storeUserEmail(email: string) {
    localStorage.setItem('userEmail', email);
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  clearUserEmail() {
    localStorage.removeItem('userEmail');
  }
  
  login(email: string, password: string): Observable<LoginResponse> {
    const projectName = 'SVLots';  // Hardcoded project name
  
    const loginData = { email, password, projectName };
  
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        console.log('Login response:', response);  // Log the response for debugging
  
        if (response.status === 1 && response.message === 'Login successful.') {
          this.storeUserEmail(response.email);
          this.storeUserName(response.name ?? '');
          this.setUserName(response.name ?? '');
          this.isAdminSubject.next(response.role?.toLowerCase() === 'admin');
          localStorage.setItem('isAdmin', (response.role?.toLowerCase() === 'admin').toString());
        } else {
          console.error('Login failed: Invalid response', response);
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);  // Log the error to investigate
        return of({
          email: '',
          message: 'Login failed. Please check your credentials.',
          status: 0,
          projectName: ''  // Provide a default value for projectName
        });
      })
    );
  }
  

  getUserNameObservable(): Observable<string | null> {
    return this.userNameSubject.asObservable();
  }

  private setUserName(name: string | null) {
    this.userNameSubject.next(name);
  }

  logout() {
    console.log('Logging out and clearing admin state');
    localStorage.removeItem('isAdmin');
    this.clearUserEmail();
    this.isAdminSubject.next(false);
    this.router.navigate(['/login']);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
  }

  isAdmin(): boolean {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    return adminStatus;
  }

  register(registerData: { name: string; PhoneNumber: string; email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  resetPassword(resetData: { token: string | null; email: string | null; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetData).pipe(
      catchError((error) => {
        if (error.error && Array.isArray(error.error) && error.error.length > 0) {
          const errorMessage = error.error.map((e: { description: any; }) => e.description).join(', ');
          return of({ message: errorMessage });
        }
        return of({ message: 'Password reset failed. Please try again.' });
      })
    );
  }

  validateToken(token: string | null, email: string | null): Observable<any> {
    if (!token || !email) {
      return of({ message: 'Invalid token or email provided.' });
    }
    return this.http.post<any>(`${this.apiUrl}/validate-token`, { token, email }).pipe(
      catchError((error) => {
        return of({ message: 'Token validation failed. Please request a new password reset.' });
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  storeUserName(name: string) {
    localStorage.setItem('userName', name);
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }
}
