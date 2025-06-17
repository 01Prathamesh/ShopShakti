import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CartButtonComponent } from '../cart-button/cart-button.component';
import { AdminButtonComponent } from '../admin-button/admin-button.component';
import { ToastService } from '../../../services/toast.service';
import { StaffButtonComponent } from '../staff-button/staff-button.component';
import { Category } from '../../../models/category.model';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, CartButtonComponent, AdminButtonComponent, StaffButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isMobileMenuOpen = false;
  isAuthDropdownOpen: boolean = false;
  userName: string = '';
  user: any = null;

  categories: Category[] = [];

  constructor(private router: Router, private cartService: CartService,  private toastService: ToastService) {
    // Update login status when navigating
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
    this.categories = [
      {
        name: 'Electronics',
        subcategories: ['Mobiles', 'Laptops', 'Tablets', 'Cameras', 'Headphones', 'Smartwatches', 'Accessories']
      },
      {
        name: 'Fashion',
        subcategories: ['Men', 'Women', 'Kids', 'Footwear', 'Jewelry', 'Watches', 'Bags', 'Sunglasses']
      },
      {
        name: 'Home & Furniture',
        subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Dining', 'Storage', 'Decor', 'Furniture Accessories']
      },
      {
        name: 'Beauty & Health',
        subcategories: ['Makeup', 'Skin Care', 'Hair Care', 'Fragrances', 'Personal Care', 'Vitamins & Supplements', 'Health Equipment']
      },
      {
        name: 'Sports & Outdoors',
        subcategories: ['Camping & Hiking', 'Cycling', 'Fitness', 'Yoga', 'Running', 'Clothing', 'Sports Accessories']
      },
      {
        name: 'Toys & Games',
        subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Dolls', 'Outdoor Toys', 'Educational Toys', 'Baby Toys']
      },
      {
        name: 'Books & Stationery',
        subcategories: ['Fiction', 'Non-fiction', 'Textbooks', 'Journals', 'Office Supplies', 'Arts & Crafts', 'School Supplies']
      },
      {
        name: 'Food & Beverages',
        subcategories: ['Snacks', 'Drinks', 'Groceries', 'Organic Foods', 'Packaged Foods', 'Health Foods', 'Confectionery']
      }
    ];

  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  toggleAuthDropdown() {
    setTimeout(() => {
      this.isAuthDropdownOpen = !this.isAuthDropdownOpen;
    }, 50);
  }

  // Toggle mobile menu for small screens
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Simulate login logic
  login(): void {
    this.isLoggedIn = true;
    localStorage.setItem('token', 'dummy_token'); // Optional: simulate auth
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.userName = '';
    this.toastService.show('Logged out successfully.', 'info');
    this.router.navigate(['/']);
  }

  // Helper methods
  private checkLoginStatus(): void {
    const userData = localStorage.getItem('user');
    try {
      this.user = userData ? JSON.parse(userData) : null;
      this.isLoggedIn = !!this.user;
      this.userName = this.user?.name || '';
    } catch {
      this.isLoggedIn = false;
      this.userName = '';
      this.user = null;
    }
  }

}
