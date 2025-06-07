import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { NewCartItem } from '../../../models/cart-item.model';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';
  searchQuery = '';
  selectedCategory = '';
  sortOption = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    // Populate filters from query params on load
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || '';
      this.sortOption = params['sort'] || '';
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
      }
    });
  }

  get uniqueCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))].sort((a, b) => a.localeCompare(b));
  }

  filteredProducts(): Product[] {
    let query = this.searchQuery.toLowerCase();

    let filtered = this.products.filter(p =>
      (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)) &&
      (this.selectedCategory ? p.category === this.selectedCategory : true)
    );

    if (this.sortOption === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }


  onSearch(): void {
    // Sync current filters to URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchQuery || null,
        category: this.selectedCategory || null,
        sort: this.sortOption || null
      },
      queryParamsHandling: 'merge'
    });
  }

  viewDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    if (!userId) {
      alert('Please log in to add items to the cart.');
      return;
    }

    const cartItem: NewCartItem = {
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    };

    this.cartService.addCartItem(cartItem).subscribe({
      next: () => alert(`${product.name} added to cart.`),
      error: (err) => {
        console.error('Add to cart failed:', err);
        alert(`Failed to add ${product.name} to cart. Please try again.`);
      }
    });
  }

}
