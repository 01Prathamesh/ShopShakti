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
  // Base URL for user profile-related endpoints
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  /**
   * Get the profile information of the current logged-in user.
   * The auth token should be handled by an HTTP interceptor.
   */
  getUserProfileById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update the user profile with new data.
   * @param updatedUser Partial user object with fields to update
   */
  updateUserProfile(updatedUser: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/me`, updatedUser)
      .pipe(catchError(this.handleError));
  }

  /**
   * Centralized error handler for HTTP requests
   * @param error HttpErrorResponse
   * @returns Observable that errors out with user-friendly message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Server-side error
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client/network error:', error.error.message);
      return throwError(() => new Error('Network error. Please try again later.'));
    } else {
      // Backend returned unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` + `body was:`, error.error
      );

      // Custom messages based on status code or error details
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
