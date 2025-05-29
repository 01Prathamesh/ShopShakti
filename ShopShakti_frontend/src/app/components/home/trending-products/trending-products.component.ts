import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-trending-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './trending-products.component.html',
  styleUrl: './trending-products.component.css'
})
export class TrendingProductsComponent {
  constructor(public router: Router) {}
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
}
