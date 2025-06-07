import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TrendingProductService {
  private apiUrl = 'https://localhost:7171/api/trendingproducts';

  constructor(private http: HttpClient) {}

  getTrendingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  setTrendingProducts(productIds: number[]): Observable<any> {
    return this.http.post(this.apiUrl, productIds);
  }
}
