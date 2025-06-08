import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';

@Component({
  standalone: true,
  selector: 'app-customer-reviews',
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-reviews.component.html',
  styleUrl: './customer-reviews.component.css'
})
export class CustomerReviewsComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getPlatformReviews().subscribe(data => {
    this.reviews = data.filter(r => r.isApprovedForHomepage);
  });

  }
  
}
