import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /** GET: Fetch all products */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      tap(() => console.log('Fetched products')),
      catchError(this.handleError<Product[]>('getAllProducts', []))
    );
  }

  /** GET: Fetch a single product by ID */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log(`Fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProductById id=${id}`))
    );
  }

  /** POST: Add a new product */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product, this.httpOptions).pipe(
      tap((newProduct: Product) => console.log(`Added product with id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** PUT: Update an existing product */
  updateProduct(productId: number, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, updatedProduct, this.httpOptions).pipe(
      tap(() => console.log(`Updated product id=${productId}`)),
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  /** DELETE: Remove a product by ID */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      tap(() => console.log(`Deleted product id=${id}`)),
      catchError(this.handleError<void>('deleteProduct'))
    );
  }

  /** Handle HTTP errors */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error); // Optionally log to remote logging infra
      return throwError(() => new Error(`${operation} failed: ${error.message || error.statusText}`));
    };
  }
}
