import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  featuredCategories = [
    { name: 'Electronics', image: 'assets/categories/electronics.jpg' },
    { name: 'Fashion', image: 'assets/categories/fashion.jpg' },
    { name: 'Beauty', image: 'assets/categories/beauty.jpg' },
    { name: 'Groceries', image: 'assets/categories/groceries.jpg' },
  ];

  topProducts = [
    {name: 'logo', price: '99', image: 'assets/images/logo.png'},
    { name: 'Smartphone', price: '₹18,999', image: 'assets/products/phone.jpg' },
    { name: 'Headphones', price: '₹1,999', image: 'assets/products/headphones.jpg' },
    { name: 'T-shirt', price: '₹499', image: 'assets/products/tshirt.jpg' },
    {name: 'logo', price: '99', image: 'assets/images/logo.png'},
    { name: 'Smartphone', price: '₹18,999', image: 'assets/products/phone.jpg' },
    { name: 'Headphones', price: '₹1,999', image: 'assets/products/headphones.jpg' },
    { name: 'T-shirt', price: '₹499', image: 'assets/products/tshirt.jpg' },
  ];
}
