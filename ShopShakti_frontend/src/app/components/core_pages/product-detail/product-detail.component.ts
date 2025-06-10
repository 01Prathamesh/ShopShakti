import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CartItem, NewCartItem } from '../../../models/cart-item.model';
import { AuthService } from '../../../services/auth.service';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  products: Product[] = [];
  relatedProducts: Product[] = [];
  quantity: number = 1;
  availability: string = 'In Stock';
  rating: number = 4.2;
  reviews: Review[] = [];
  newReview: Partial<Review> = { rating: 5, message: '' };
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          this.isLoading = false;
          this.loadReviews(data.id);
          this.productService.getAllProducts().subscribe({
            next: (allProducts) => {
              this.products = allProducts;
              this.relatedProducts = this.getRelatedProducts(data.category, data.id);
            },
            error: () => this.toastService.show('Failed to load related products.', 'error', 4000)
          });
        },
        error: () => {
          this.errorMessage = 'Product not found.';
          this.isLoading = false;
          this.toastService.show(this.errorMessage, 'error', 4000);
        }
      });
    }
  }

  getRoundedRating(): number {
    return Math.round(this.rating);
  }

  getRelatedProducts(category: string, currentId: number): Product[] {
    return this.products.filter(p => p.category === category && p.id !== currentId).slice(0, 3);
  }

  addToCart(): void {
    if (this.product) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        this.toastService.show('Please log in to add items to the cart.', 'error');
        return;
      }
      const item: NewCartItem = {
        productId: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        imageUrl: this.product.imageUrl
      };
      this.cartService.addCartItem(item).subscribe({
        next: () => this.toastService.show(`${this.product?.name} added to cart.`, 'success'),
        error: () => this.toastService.show('Failed to add to cart. Try again.', 'error')
      });
    }
  }

  buyNow(): void {
    if (this.product) {
      const item: CartItem = {
        id: this.product.id,
        productId: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        imageUrl: this.product.imageUrl
      };
      this.authService.setBuyNowItem(item);
      this.router.navigate(['/checkout']);
    }
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  loadReviews(productId: number): void {
    this.reviewService.getProductReviews(productId).subscribe({
      next: reviews => this.reviews = reviews,
      error: () => this.toastService.show('Failed to load reviews.', 'error', 4000)
    });
  }

  submitReview(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) {
      this.toastService.show('Please log in to review.', 'error');
      return;
    }
    const review: Review = {
      userId: user.id,
      userName: user.name,
      productId: this.product?.id,
      message: this.newReview.message!,
      rating: this.newReview.rating!
    };
    this.reviewService.submit(review).subscribe({
      next: () => {
        this.loadReviews(this.product!.id);
        this.newReview = { rating: 5, message: '' };
        this.toastService.show('Review submitted successfully!', 'success');
      },
      error: () => this.toastService.show('Failed to submit review.', 'error', 4000)
    });
  }
}
