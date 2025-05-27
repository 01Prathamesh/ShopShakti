import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/users`;  // adjust endpoint as per backend

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);  // example endpoint for current user
  }

  // Add other profile-related methods here if needed
}
