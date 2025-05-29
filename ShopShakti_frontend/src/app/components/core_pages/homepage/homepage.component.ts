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

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [CommonModule, RouterModule, TrendingProductsComponent, FeaturedCategoriesComponent, BenefitsComponent, TopDealsComponent, CustomerReviewsComponent, NewsletterSubscriptionComponent, BannerCarouselComponent, SearchbarComponent, CategorySidebarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {
  constructor(public router: Router) {}

}
