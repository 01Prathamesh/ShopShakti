import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isMobileMenuOpen = false;
  cartCount = 0;
  isAuthDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadCartCount();
  }

  toggleAuthDropdown() {
    this.isAuthDropdownOpen = !this.isAuthDropdownOpen;
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
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.cartCount = 0;
    // Optional: redirect to home
  }

  // Helper methods
  private checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  private loadCartCount(): void {
    const count = localStorage.getItem('cartCount');
    this.cartCount = count ? +count : 0;
  }
}
