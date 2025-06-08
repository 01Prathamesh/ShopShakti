import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FeaturedCategory } from '../models/featured-category.model';

@Injectable({ providedIn: 'root' })
export class FeaturedCategoryService {
  private apiUrl = `${environment.apiUrl}/FeaturedCategories`;

  constructor(private http: HttpClient) {}

  getFeaturedCategories(): Observable<FeaturedCategory[]> {
    return this.http.get<FeaturedCategory[]>(this.apiUrl);
  }

  updateFeaturedCategories(categories: FeaturedCategory[]): Observable<any> {
    return this.http.post(this.apiUrl, categories);
  }
}
