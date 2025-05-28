import { Routes } from '@angular/router';
import { HomepageComponent } from './components/core_pages/homepage/homepage.component';
import { ProductListComponent } from './components/core_pages/product-list/product-list.component';
import { ProductDetailComponent } from './components/core_pages/product-detail/product-detail.component';
import { ProfileComponent } from './components/auth_user_pages/profile/profile.component';
import { CartComponent } from './components/core_pages/cart/cart.component';
import { RegisterComponent } from './components/auth_user_pages/register/register.component';
import { LoginComponent } from './components/auth_user_pages/login/login.component';
import { canActivateAdmin } from './components/admin/admin-dashboard/admin.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'cart', component: CartComponent},
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [canActivateAdmin]
  },
];
