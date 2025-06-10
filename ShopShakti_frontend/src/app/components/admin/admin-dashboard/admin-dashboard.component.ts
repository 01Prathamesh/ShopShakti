import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMetricsDto } from '../../../models/admin-matrics.dto';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ProductManagementComponent } from '../product-management/product-management.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { OrderManagementComponent } from '../order-management/order-management.component';
import { ToastService } from '../../../services/toast.service';
import { OrderSettingsService } from '../../../services/order-settings.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule, ProductManagementComponent, UserManagementComponent, OrderManagementComponent, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  metrics: AdminMetricsDto = {
    users: 0,
    orders: 0,
    revenue: 0,
    revenueFormatted: '0',
    activeProducts: 0,
    productsValue: 0,
    productsValueFormatted: '0'
  };

  isLoading = true;
  errorMessage = '';
  shippingFee = 40;
  tax = 20;
  settingsUpdating = false;

  // Toggle states
  showProducts = false;
  showUsers = false;
  showOrders = false;

  constructor(
    private adminService: AdminService,
    private toastService: ToastService,
    private settingsService: OrderSettingsService
  ) {}

  ngOnInit(): void {
    this.adminService.getMetrics().subscribe({
      next: (data: AdminMetricsDto) => {
        this.metrics = data;
        this.isLoading = false;
        this.toastService.show('Admin metrics loaded successfully!', 'success');
      },
      error: () => {
        this.errorMessage = 'Failed to load metrics.';
        this.isLoading = false;
        this.toastService.show('Failed to load admin metrics.', 'error', 4000);
      }
    });
    this.settingsService.getSettings().subscribe(s => {
      this.shippingFee = s.shippingFee;
      this.tax = s.tax;
    });
  }

  toggle(section: 'products' | 'users' | 'orders'): void {
    this.showProducts = section === 'products' ? !this.showProducts : false;
    this.showUsers = section === 'users' ? !this.showUsers : false;
    this.showOrders = section === 'orders' ? !this.showOrders : false;
  }

  updateSettings() {
    this.settingsUpdating = true;
    this.settingsService.updateSettings({ shippingFee: this.shippingFee, tax: this.tax }).subscribe(() => {
      this.toastService.show('Settings updated', 'success');
      this.settingsUpdating = false;
    });
  }
}
