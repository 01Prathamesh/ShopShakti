import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMetricsDto } from '../../../models/admin-matrics.dto';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ProductManagementComponent } from '../product-management/product-management.component';
import { UserManagementComponent } from '../user-management/user-management.component';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule, ProductManagementComponent, UserManagementComponent],
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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getMetrics().subscribe({
      next: (data: AdminMetricsDto) => {
        this.metrics = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load metrics.';
        this.isLoading = false;
      }
    });
  }
}