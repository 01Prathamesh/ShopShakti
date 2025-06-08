import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly baseUrl = `${environment.apiUrl}/Reviews`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl);
    }

  getProductReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/product/${productId}`);
  }

  getPlatformReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/platform`);
  }

  submit(review: Review): Observable<any> {
    return this.http.post(this.baseUrl, review);
  }

  update(review: Review): Observable<any> {
    return this.http.put(`${this.baseUrl}/${review.id}`, review);
  }

  delete(reviewId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reviewId}`);
  }
}
