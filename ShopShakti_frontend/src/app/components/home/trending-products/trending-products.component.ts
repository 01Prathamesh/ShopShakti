import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { TrendingProductService } from '../../../services/trending-product.service';
import { CartService } from '../../../services/cart.service';
import { NewCartItem } from '../../../models/cart-item.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-trending-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './trending-products.component.html',
  styleUrl: './trending-products.component.css',
})
export class TrendingProductsComponent implements OnInit {
  trendingProducts: Product[] = [];
  isLoading = true;

  constructor(
    private trendingService: TrendingProductService,
    private cartService: CartService,
    private toastService : ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trendingService.getTrendingProducts().subscribe({
      next: (products) => {
        this.trendingProducts = products;
        this.isLoading = false;
      },
      error: () => {
        this.trendingProducts = [];
        this.isLoading = false;
      },
    });
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    if (!userId) {
      this.toastService.show('Please log in to add items to the cart.', 'error');
      return;
    }

    const cartItem: NewCartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    };

    this.cartService.addCartItem(cartItem).subscribe({
      next: () => this.toastService.show(`${product.name} added to cart.`, 'success'),
      error: () => this.toastService.show(`Failed to add ${product.name} to cart. Try again.`, 'error')
    });
  }
}