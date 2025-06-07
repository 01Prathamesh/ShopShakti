import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrendingProductService } from '../../../services/trending-product.service';

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

  constructor(private productService: ProductService, private trendingService: TrendingProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.map(p => ({ ...p, trending: false }));
        this.isLoading = false;
      },
      error: (err) => {
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

    this.trendingService.setTrendingProducts(this.selectedProductIds).subscribe(() => {
      alert('Trending products updated!');
    });
  }


  filteredProducts(): ProductWithTrending[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
