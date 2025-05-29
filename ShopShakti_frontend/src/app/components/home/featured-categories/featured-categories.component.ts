import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-featured-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-categories.component.html',
  styleUrl: './featured-categories.component.css'
})
export class FeaturedCategoriesComponent {
  constructor(public router: Router) {}
  featuredCategories = [
    { name: 'Electronics', image: 'assets/images/categories/electronics.jpg' },
    { name: 'Fashion', image: 'assets/images/categories/fashion.jpg' },
    { name: 'Beauty', image: 'assets/images/categories/beauty.jpg' },
    { name: 'Groceries', image: 'assets/images/categories/groceries.jpg' },
  ];
}
