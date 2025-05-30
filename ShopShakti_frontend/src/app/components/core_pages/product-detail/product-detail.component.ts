import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';


@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  private cartService: CartService,
  private router: Router
) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Product not found.';
          this.isLoading = false;
        },
      });
    }
  }
  addToCart() {
    if (this.product) {
      const item = {
        name: this.product.name,
        price: this.product.price,
        quantity: 1,
        imageUrl: this.product.imageUrl
      };
      this.cartService.addCartItem(item).subscribe({
        next: () => this.router.navigate(['/cart']),
        error: err => console.error('Add to cart failed', err)
      });
    }
  }
}