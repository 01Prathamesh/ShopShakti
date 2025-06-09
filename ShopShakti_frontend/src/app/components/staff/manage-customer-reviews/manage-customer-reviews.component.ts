import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';
import { ToastService } from '../../../services/toast.service';

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

  constructor(private reviewService: ReviewService, private toast: ToastService) {}

  ngOnInit(): void {
    this.reviewService.getAll().subscribe({
      next: reviews => {
        this.productReviews = reviews.filter(r => r.productId != null);
        this.platformReviews = reviews.filter(r => r.productId == null);
      },
      error: () => this.toast.show('Failed to load reviews.', 'error')
    });
  }

  toggleApproval(review: Review): void {
    review.isApprovedForHomepage = !review.isApprovedForHomepage;
    this.reviewService.update(review).subscribe({
      next: () => this.toast.show('Review approval updated.', 'success'),
      error: () => this.toast.show('Failed to update approval.', 'error')
    });
  }

  deleteReview(reviewId: number): void {
    if (!reviewId) return;
    this.reviewService.delete(reviewId).subscribe({
      next: () => {
        this.platformReviews = this.platformReviews.filter(r => r.id !== reviewId);
        this.productReviews = this.productReviews.filter(r => r.id !== reviewId);
        this.toast.show('Review deleted.', 'success');
      },
      error: () => this.toast.show('Failed to delete review.', 'error')
    });
  }
}
