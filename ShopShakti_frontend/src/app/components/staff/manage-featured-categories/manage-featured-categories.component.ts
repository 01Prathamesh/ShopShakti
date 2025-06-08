import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { FeaturedCategoryService } from '../../../services/featured-category.service';
import { ToastService } from '../../../services/toast.service';
import { Product } from '../../../models/product.model';
import { FeaturedCategory } from '../../../models/featured-category.model';

@Component({
  standalone: true,
  selector: 'app-manage-featured-categories',
  templateUrl: './manage-featured-categories.component.html',
  styleUrl: './manage-featured-categories.component.css',
  imports: [CommonModule, FormsModule]
})
export class ManageFeaturedCategoriesComponent implements OnInit {
  products: Product[] = [];
  categories: { name: string, imageUrl: string }[] = [];
  selectedCategories: Set<string> = new Set();
  isLoading = true;
  isSaving = false;

  constructor(
    private productService: ProductService,
    private featuredService: FeaturedCategoryService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.productService.getAllProducts().subscribe({
      next: products => {
        this.products = products;

        // Extract unique categories with image
        const unique = new Map<string, string>();
        for (let p of products) {
          if (!unique.has(p.category)) {
            unique.set(p.category, p.imageUrl);
          }
        }

        this.categories = Array.from(unique.entries()).map(([name, imageUrl]) => ({ name, imageUrl }));

        // Now fetch existing featured categories
        this.featuredService.getFeaturedCategories().subscribe({
          next: featured => {
            this.selectedCategories = new Set(featured.map(c => c.name));
            this.isLoading = false;
          },
          error: () => {
            this.toast.show('Failed to load featured categories.', 'error');
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.toast.show('Failed to load products.', 'error');
        this.isLoading = false;
      }
    });
  }

  toggleCategory(name: string): void {
    if (this.selectedCategories.has(name)) {
      this.selectedCategories.delete(name);
    } else {
      this.selectedCategories.add(name);
    }
  }

  isSelected(name: string): boolean {
    return this.selectedCategories.has(name);
  }

  saveFeaturedCategories(): void {
    this.isSaving = true;

    const selected = this.categories.filter(c => this.selectedCategories.has(c.name));
    this.featuredService.updateFeaturedCategories(selected).subscribe({
      next: () => {
        this.toast.show('Featured categories updated.', 'success');
        this.isSaving = false;
      },
      error: () => {
        this.toast.show('Failed to update featured categories.', 'error');
        this.isSaving = false;
      }
    });
  }
}
