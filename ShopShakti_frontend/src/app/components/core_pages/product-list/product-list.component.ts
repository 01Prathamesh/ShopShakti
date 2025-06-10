import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { NewCartItem } from '../../../models/cart-item.model';
import { ToastService } from '../../../services/toast.service';

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
  currentPage = 1;
  itemsPerPage = 12;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
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
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
        this.toastService.show(this.errorMessage, 'error', 4000);
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
    if (!user?.id) {
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
      error: () => this.toastService.show(`Failed to add ${product.name} to cart.`, 'error')
    });
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts().slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts().length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get visiblePageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const range = 2;
    let start = Math.max(current - range, 1);
    let end = Math.min(current + range, total);
    if (current <= range) end = Math.min(5, total);
    if (current >= total - range + 1) start = Math.max(total - 4, 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
