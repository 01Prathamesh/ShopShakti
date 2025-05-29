import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-customer-reviews',
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-reviews.component.html',
  styleUrl: './customer-reviews.component.css'
})
export class CustomerReviewsComponent {
  constructor (public router: Router) {}
  reviews = [
    { name: 'Anjali R.', message: 'ShopShakti is my go-to for amazing discounts!' },
    { name: 'Rahul K.', message: 'Fast delivery and genuine products!' },
    { name: 'Neha P.', message: 'Customer service is super helpful and quick.' },
  ];
}
