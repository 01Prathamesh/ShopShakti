import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeaturedCategoryService } from '../../../services/featured-category.service';
import { ProductService } from '../../../services/product.service';
import { FeaturedCategory } from '../../../models/featured-category.model';
import { Product } from '../../../models/product.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-categories',
  standalone: true,
  templateUrl: './featured-categories.component.html',
  styleUrl: './featured-categories.component.css',
  imports: [CommonModule, RouterModule]
})
export class FeaturedCategoriesComponent implements OnInit, OnDestroy {
  featuredCategories: FeaturedCategory[] = [];
  categoryImages: { [key: string]: string[] } = {};
  rotatingImages: { [key: string]: string } = {};
  intervalIds: any[] = [];
  isLoading = true;

  constructor(
    private featuredService: FeaturedCategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeatured();
  }

  ngOnDestroy(): void {
    this.intervalIds.forEach(id => clearInterval(id));
  }

  loadFeatured(): void {
    this.featuredService.getFeaturedCategories().subscribe({
      next: featured => {
        this.featuredCategories = featured;
        this.loadProductImages();
      },
      error: () => {
        console.error('Failed to load featured categories');
        this.isLoading = false;
      }
    });
  }

  loadProductImages(): void {
    this.productService.getAllProducts().subscribe({
      next: products => {
        for (let category of this.featuredCategories) {
          const images = products
            .filter(p => p.category === category.name)
            .map(p => p.imageUrl);

          if (images.length > 0) {
            this.categoryImages[category.name] = images;
            this.rotatingImages[category.name] = images[0];

            // Start rotation
            let index = 0;
            const intervalId = setInterval(() => {
              index = (index + 1) % images.length;
              this.rotatingImages[category.name] = images[index];
            }, 3000); // rotate every 3 seconds

            this.intervalIds.push(intervalId);
          } else {
            // fallback to category's original image
            this.rotatingImages[category.name] = category.imageUrl;
          }
        }

        this.isLoading = false;
      },
      error: () => {
        console.error('Failed to load products for featured categories');
        this.isLoading = false;
      }
    });
  }

  goToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
}
