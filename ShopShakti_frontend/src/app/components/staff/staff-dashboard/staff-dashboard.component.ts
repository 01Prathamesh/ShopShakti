import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBenefitsComponent } from '../manage-benefits/manage-benefits.component';
import { ManageCustomerReviewsComponent } from '../manage-customer-reviews/manage-customer-reviews.component';
import { ManageFeaturedCategoriesComponent } from '../manage-featured-categories/manage-featured-categories.component';
import { ManageNewsletterSubscriptionComponent } from '../manage-newsletter-subscription/manage-newsletter-subscription.component';
import { ManageTopDealsComponent } from '../manage-top-deals/manage-top-deals.component';
import { ManageTrandingProductsComponent } from '../manage-tranding-products/manage-tranding-products.component';
import { OrderManagementComponent } from '../../admin/order-management/order-management.component';

@Component({
  standalone: true,
  selector: 'app-staff-dashboard',
  imports: [
    CommonModule,
    ManageTrandingProductsComponent,
    ManageBenefitsComponent,
    ManageTopDealsComponent,
    ManageCustomerReviewsComponent,
    ManageFeaturedCategoriesComponent,
    ManageNewsletterSubscriptionComponent,
    OrderManagementComponent
  ],
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.css'
})
export class StaffDashboardComponent {
  showTrending = false;
  showBenefits = false;
  showDeals = false;
  showReviews = false;
  showCategories = false;
  showNewsletter = false;
  showOrderManagement = false;

  toggle(section: string): void {
    this.showTrending = section === 'trending' ? !this.showTrending : false;
    this.showBenefits = section === 'benefits' ? !this.showBenefits : false;
    this.showDeals = section === 'deals' ? !this.showDeals : false;
    this.showReviews = section === 'reviews' ? !this.showReviews : false;
    this.showCategories = section === 'categories' ? !this.showCategories : false;
    this.showNewsletter = section === 'newsletter' ? !this.showNewsletter : false;
    this.showOrderManagement = section === 'orderManage' ? !this.showOrderManagement : false;
  }
}
