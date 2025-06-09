import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerCarouselComponent } from '../../ui_ux/banner-carousel/banner-carousel.component';
import { SearchbarComponent } from '../../ui_ux/searchbar/searchbar.component';
import { CategorySidebarComponent } from '../../ui_ux/category-sidebar/category-sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { TrendingProductsComponent } from '../../home/trending-products/trending-products.component';
import { FeaturedCategoriesComponent } from '../../home/featured-categories/featured-categories.component';
import { BenefitsComponent } from '../../home/benefits/benefits.component';
import { TopDealsComponent } from '../../home/top-deals/top-deals.component';
import { CustomerReviewsComponent } from '../../home/customer-reviews/customer-reviews.component';
import { NewsletterSubscriptionComponent } from '../../home/newsletter-subscription/newsletter-subscription.component';
import { ProductService } from '../../../services/product.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [
    CommonModule, RouterModule,
    TrendingProductsComponent, FeaturedCategoriesComponent, BenefitsComponent,
    TopDealsComponent, CustomerReviewsComponent, NewsletterSubscriptionComponent,
    BannerCarouselComponent, SearchbarComponent, CategorySidebarComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  categories: string[] = [];

  constructor(
    public router: Router,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: products => {
        this.categories = [...new Set(products.map(p => p.category))].sort((a, b) => a.localeCompare(b));
      },
      error: err => {
        console.error('Failed to fetch categories:', err);
        this.toastService.show('Failed to load categories.', 'error', 4000);
      }
    });
  }

  onCategorySelected(category: string) {
    const queryParams = { category };
    this.router.navigate(['/products'], { queryParams });
  }
}
