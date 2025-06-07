import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrendingProductService } from '../../../services/trending-product.service';
import { ToastService } from '../../../services/toast.service';

interface ProductWithTrending extends Product {
  trending?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-manage-tranding-products',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-tranding-products.component.html',
  styleUrl: './manage-tranding-products.component.css'
})
export class ManageTrandingProductsComponent implements OnInit {

  products: ProductWithTrending[] = [];
  selectedProductIds: number[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedCategory: string = '';
  uniqueCategories: string[] = [];

  constructor(private productService: ProductService, private trendingService: TrendingProductService, private toast: ToastService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.trendingService.getTrendingProducts().subscribe({
          next: (trending) => {
            const trendingIds = trending.map(p => p.id);
            this.products = products.map(p => ({
              ...p,
              trending: trendingIds.includes(p.id)
            }));

            this.uniqueCategories = [
              ...new Set(
                this.products
                  .map(p => p.category)
                  .filter(cat => cat && cat.trim() !== '')
              )
            ].sort((a, b) => a.localeCompare(b));

            this.isLoading = false;
          },
          error: () => {
            this.errorMessage = 'Failed to load trending products';
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  toggleTrending(product: ProductWithTrending) {
    product.trending = !product.trending;
  }

  saveTrending() {
    this.selectedProductIds = this.products
      .filter(p => p.trending)
      .map(p => p.id);

    this.trendingService.setTrendingProducts(this.selectedProductIds).subscribe({
      next: () => {
        this.toast.show('Trending products updated successfully!', 'success');
      },
      error: () => {
        this.toast.show('Failed to update trending products.', 'error');
      }
    });
  }


  filteredProducts(): ProductWithTrending[] {
    const query = this.searchQuery.toLowerCase();

    return this.products.filter(product =>
      (product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)) &&
      (this.selectedCategory === '' || product.category === this.selectedCategory)
    );
  }
}
