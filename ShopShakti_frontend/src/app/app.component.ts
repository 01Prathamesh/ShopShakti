import { Component } from '@angular/core';
import { HomepageComponent } from './components/core_pages/homepage/homepage.component';
import { ProductDetailComponent } from './components/core_pages/product-detail/product-detail.component';
import { ProductListComponent } from './components/core_pages/product-list/product-list.component';
import { CheckoutComponent } from './components/core_pages/checkout/checkout.component';
import { CartComponent } from './components/core_pages/cart/cart.component';
import { NavbarComponent } from './components/ui_ux/navbar/navbar.component';
import { FooterComponent } from './components/ui_ux/footer/footer.component';
import { SearchbarComponent } from './components/ui_ux/searchbar/searchbar.component';
import { BannerCarouselComponent } from './components/ui_ux/banner-carousel/banner-carousel.component';
import { CategorySidebarComponent } from './components/ui_ux/category-sidebar/category-sidebar.component';
import { ToastComponent } from './components/ui_ux/toast/toast.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';
import { OrderSummaryComponent } from './components/orders/order-summary/order-summary.component';
import { LoginComponent } from './components/auth_user_pages/login/login.component';
import { ProfileComponent } from './components/auth_user_pages/profile/profile.component';
import { RegisterComponent } from './components/auth_user_pages/register/register.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { OrderManagementComponent } from './components/admin/order-management/order-management.component';
import { ProductManagementComponent } from './components/admin/product-management/product-management.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent,ProductDetailComponent, ProductListComponent, CheckoutComponent, CartComponent, NavbarComponent, FooterComponent, SearchbarComponent, BannerCarouselComponent, CategorySidebarComponent, ToastComponent, OrderListComponent, OrderSuccessComponent, OrderSummaryComponent, LoginComponent, ProfileComponent, RegisterComponent, AdminDashboardComponent, OrderManagementComponent, ProductManagementComponent, UserManagementComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShopShakti_frontend';
}
