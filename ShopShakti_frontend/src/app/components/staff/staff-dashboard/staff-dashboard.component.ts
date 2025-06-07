import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ManageBenefitsComponent } from '../manage-benefits/manage-benefits.component';
import { ManageCustomerReviewsComponent } from '../manage-customer-reviews/manage-customer-reviews.component';
import { ManageFeaturedCategoriesComponent } from '../manage-featured-categories/manage-featured-categories.component';
import { ManageNewsletterSubscriptionComponent } from '../manage-newsletter-subscription/manage-newsletter-subscription.component';
import { ManageTopDealsComponent } from '../manage-top-deals/manage-top-deals.component';
import { ManageTrandingProductsComponent } from '../manage-tranding-products/manage-tranding-products.component';

@Component({
  standalone: true,
  selector: 'app-staff-dashboard',
  imports: [CommonModule, ManageBenefitsComponent, ManageCustomerReviewsComponent, ManageFeaturedCategoriesComponent, ManageNewsletterSubscriptionComponent, ManageTopDealsComponent, ManageTrandingProductsComponent ],
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.css'
})
export class StaffDashboardComponent {

}
