import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-newsletter-subscription',
  imports: [CommonModule, RouterModule],
  templateUrl: './newsletter-subscription.component.html',
  styleUrl: './newsletter-subscription.component.css'
})
export class NewsletterSubscriptionComponent {
  constructor(public router: Router) {}
  
}
