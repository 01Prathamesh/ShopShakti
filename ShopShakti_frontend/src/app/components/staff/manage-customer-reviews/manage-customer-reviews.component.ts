import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';

@Component({
  standalone: true,
  selector: 'app-manage-customer-reviews',
  imports: [CommonModule],
  templateUrl: './manage-customer-reviews.component.html',
  styleUrl: './manage-customer-reviews.component.css'
})
export class ManageCustomerReviewsComponent implements OnInit {
  productReviews: Review[] = [];
  platformReviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getAll().subscribe(reviews => {
      this.productReviews = reviews.filter(r => r.productId != null);
      this.platformReviews = reviews.filter(r => r.productId == null);
    });
  }

  toggleApproval(review: Review): void {
    review.isApprovedForHomepage = !review.isApprovedForHomepage;
    this.reviewService.update(review).subscribe();
  }

  deleteReview(reviewId: number): void {
    if (!reviewId) return;
    this.reviewService.delete(reviewId).subscribe(() => {
      this.platformReviews = this.platformReviews.filter(r => r.id !== reviewId);
      this.productReviews = this.productReviews.filter(r => r.id !== reviewId);
    });
  }
}
