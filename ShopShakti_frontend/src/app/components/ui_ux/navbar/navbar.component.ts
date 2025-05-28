import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  userName: string = '';
  user: any = null;

  constructor(private router: Router) {
    // Update login status when navigating
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadCartCount();
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
    localStorage.removeItem('token'); // if you're simulating token-based auth
    this.isLoggedIn = false;
    this.userName = '';
    this.cartCount = 0;
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

  private loadCartCount(): void {
    const count = localStorage.getItem('cartCount');
    this.cartCount = count ? +count : 0;
  }
}
