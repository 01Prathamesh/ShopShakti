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
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private reviewService: ReviewService,
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

          // Fetch all products to filter related ones
          this.productService.getAllProducts().subscribe({
            next: (allProducts) => {
              this.products = allProducts;
              this.relatedProducts = this.getRelatedProducts(data.category, data.id);
            },
            error: (err) => console.error('Failed to fetch products for related items', err)
          });
        },
        error: () => {
          this.errorMessage = 'Product not found.';
          this.isLoading = false;
        }
      });
    }
  }

  getRelatedProducts(category: string, currentId: number): Product[] {
    return this.products
      .filter(p => p.category === category && p.id !== currentId)
      .slice(0, 3);
  }

  getRoundedRating(): number {
    return Math.round(this.rating);
  }


  addToCart(): void {
    if (this.product) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?.id;
      if (!userId) {
        alert('Please log in to add items to the cart.');
        return;
      }
      const item: NewCartItem = {
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        imageUrl: this.product.imageUrl
      };

      this.cartService.addCartItem(item).subscribe({
        next: () => {
          this.successMessage = `${this.product?.name} added to cart`;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Add to cart failed', err);
          alert('Failed to add to cart. Try again.');
        }
      });
    }
  }

  buyNow(): void {
    if (this.product) {
      const item: CartItem = {
        id: this.product.id,
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
    this.router.navigate(['/products', productId]);
  }

  

  loadReviews(productId: number): void {
    this.reviewService.getProductReviews(productId).subscribe(reviews => this.reviews = reviews);
  }

  submitReview(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) {
      alert('Please login to review.');
      return;
    }

    const review: Review = {
      userId: user.id,
      userName: user.name,
      productId: this.product?.id,
      message: this.newReview.message!,
      rating: this.newReview.rating!,
    };

    this.reviewService.submit(review).subscribe({
      next: () => {
        this.loadReviews(this.product!.id);
        this.newReview = { rating: 5, message: '' };
        this.successMessage = 'Review submitted successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        alert('Something went wrong. Try again.');
      }
    });
  }
}
