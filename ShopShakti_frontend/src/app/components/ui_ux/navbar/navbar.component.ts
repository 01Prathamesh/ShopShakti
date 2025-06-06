import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CartButtonComponent } from '../cart-button/cart-button.component';
import { AdminButtonComponent } from '../admin-button/admin-button.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, CartButtonComponent, AdminButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isMobileMenuOpen = false;
  isAuthDropdownOpen: boolean = false;
  userName: string = '';
  user: any = null;

  constructor(private router: Router, private cartService: CartService,  private toastService: ToastService) {
    // Update login status when navigating
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
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
