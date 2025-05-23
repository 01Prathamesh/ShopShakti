import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerCarouselComponent } from '../../ui_ux/banner-carousel/banner-carousel.component';
import { SearchbarComponent } from '../../ui_ux/searchbar/searchbar.component';
import { CategorySidebarComponent } from '../../ui_ux/category-sidebar/category-sidebar.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [CommonModule,RouterModule, BannerCarouselComponent, SearchbarComponent, CategorySidebarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {
  constructor(public router: Router) {}
  featuredCategories = [
    { name: 'Electronics', image: 'assets/images/categories/electronics.jpg' },
    { name: 'Fashion', image: 'assets/images/categories/fashion.jpg' },
    { name: 'Beauty', image: 'assets/images/categories/beauty.jpg' },
    { name: 'Groceries', image: 'assets/images/categories/groceries.jpg' },
  ];

  topProducts = [
    {name: 'logo', price: '99', image: 'assets/images/logo.png'},
    { name: 'Smartphone', price: '₹18,999', image: 'assets/images/products/phone.jpg' },
    { name: 'Headphones', price: '₹1,999', image: 'assets/images/products/headphones.jpg' },
    { name: 'T-shirt', price: '₹499', image: 'assets/images/products/tshirt.jpg' },
    {name: 'logo', price: '99', image: 'assets/images/logo.png'},
    { name: 'Smartphone', price: '₹18,999', image: 'assets/images/products/phone.jpg' },
    { name: 'Headphones', price: '₹1,999', image: 'assets/images/products/headphones.jpg' },
    { name: 'T-shirt', price: '₹499', image: 'assets/images/products/tshirt.jpg' },
  ];

  topDeals = [
    { name: 'Smartphone', image: 'assets/images/deals/phone.jpg', price: 11999 },
    { name: 'Sneakers', image: 'assets/images/deals/shoes.jpg', price: 2599 },
    { name: 'Washing Machine', image: 'assets/images/deals/wash.jpg', price: 15999 },
  ];

  reviews = [
    { name: 'Anjali R.', message: 'ShopShakti is my go-to for amazing discounts!' },
    { name: 'Rahul K.', message: 'Fast delivery and genuine products!' },
    { name: 'Neha P.', message: 'Customer service is super helpful and quick.' },
  ];
  trendingProducts = [
    {
      name: 'Wireless Headphones',
      price: 2999,
      image: 'assets/images/products/headphones.jpg'
    },
    {
      name: 'Smartwatch',
      price: 4999,
      image: 'assets/images/products/smartwatch.jpg'
    },
    {
      name: 'Running Shoes',
      price: 1999,
      image: 'assets/images/products/shoes.jpg'
    },
    {
      name: 'Air Conditioner',
      price: 25999,
      image: 'assets/images/products/ac.jpg'
    }
  ];

  onCategoryChange(category: string) {
    // Use the selected category
    console.log('Parent Received:', category);
  }

}
