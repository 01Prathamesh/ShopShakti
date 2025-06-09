import { Routes } from '@angular/router';
import { HomepageComponent } from './components/core_pages/homepage/homepage.component';
import { ProductListComponent } from './components/core_pages/product-list/product-list.component';
import { ProductDetailComponent } from './components/core_pages/product-detail/product-detail.component';
import { RegisterComponent } from './components/auth_user_pages/register/register.component';
import { LoginComponent } from './components/auth_user_pages/login/login.component';
import { canActivateAdmin } from './components/admin/admin-dashboard/admin.guard';
import { canActivateUser } from './guards/auth.guard';
import { CheckoutComponent } from './components/core_pages/checkout/checkout.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { OrderSummaryComponent } from './components/orders/order-summary/order-summary.component';
import { StaffDashboardComponent } from './components/staff/staff-dashboard/staff-dashboard.component';
import { canActivateRole } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'profile/:id',
    loadComponent: () =>
      import('./components/auth_user_pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [canActivateUser]
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/core_pages/cart/cart.component').then(m => m.CartComponent),
    canActivate: [canActivateUser]
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [canActivateAdmin]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [canActivateUser]
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [canActivateUser]
  },
  {
    path: 'order-list',
    component: OrderListComponent,
    canActivate: [canActivateUser]
  },
  {
    path: 'order-summary/:id',
    component: OrderSummaryComponent,
    canActivate: [canActivateUser]
  },
  {
    path: 'staff',
    component: StaffDashboardComponent,
    canActivate: [canActivateUser, canActivateRole],
    data: { roles: ['Admin', 'Staff'] }
  },

  { path: '**', redirectTo: '' }
];
