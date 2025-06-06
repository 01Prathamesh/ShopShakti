import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  /**
   * Get the profile information of the user by ID.
   */
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`);
  }

  /**
   * Update the user profile with new data.
   */
  updateUserProfile(id: number, updatedUser: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/profile`, updatedUser)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all users (admin-only operation).
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  /**
   * Delete a user by ID (admin-only operation).
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Centralized error handler for HTTP requests.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Client/network error:', error.error.message);
      return throwError(() => new Error('Network error. Please try again later.'));
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      switch (error.status) {
        case 400:
          return throwError(() => new Error('Bad request. Please check your input.'));
        case 401:
          return throwError(() => new Error('Unauthorized. Please log in again.'));
        case 403:
          return throwError(() => new Error('Access denied.'));
        case 404:
          return throwError(() => new Error('User profile not found.'));
        case 500:
          return throwError(() => new Error('Internal server error. Please try later.'));
        default:
          return throwError(() => new Error('Unexpected error occurred.'));
      }
    }
  }
}
