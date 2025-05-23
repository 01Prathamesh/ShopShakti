import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return of([
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        price: 2499,
        category: 'Electronics',
        imageUrl: 'assets/images/products/headphones.jpg'
      },
      {
        id: 2,
        name: 'Fitness Smartwatch',
        description: 'Track your activity and health metrics 24/7.',
        price: 4999,
        category: 'Wearables',
        imageUrl: 'assets/images/products/smartwatch.jpg'
      },
      {
        id: 3,
        name: 'Casual Sneakers',
        description: 'Comfortable and stylish sneakers for everyday wear.',
        price: 1899,
        category: 'Footwear',
        imageUrl: 'assets/images/products/shoes.jpg'
      }
    ]);
  }

  getProductById(id: number): Observable<Product> {
    const products = this.getAllProducts();
    return new Observable<Product>((observer) => {
      products.subscribe(data => {
        const product = data.find(p => p.id === id);
        if (product) {
          observer.next(product);
          observer.complete();
        } else {
          observer.error('Product not found');
        }
      });
    });
  }
}
