import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter-subscription.component.html',
  styleUrl: './newsletter-subscription.component.css'
})
export class NewsletterSubscriptionComponent {
  email = '';
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  subscribe() {
    if (!this.email) return;

    this.http.post(`${environment.apiUrl}/Newsletter`, { email: this.email }).subscribe({
      next: () => {
        this.successMessage = 'Subscribed successfully!';
        this.email = '';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: () => {
        this.errorMessage = 'Subscription failed. Try again.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    });
  }
}
