import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TopDeal } from '../../../models/top-deal.model';
import { TopDealService } from '../../../services/top-deal.service';

@Component({
  standalone: true,
  selector: 'app-top-deals',
  imports: [CommonModule, RouterModule],
  templateUrl: './top-deals.component.html',
  styleUrl: './top-deals.component.css'
})
export class TopDealsComponent {
  topDeals: TopDeal[] = [];

  constructor(private topDealService: TopDealService, public router: Router) {}

  ngOnInit(): void {
    this.topDealService.getAll().subscribe({
      next: (data) => this.topDeals = data,
      error: () => console.error('Failed to load top deals')
    });
  }

  goToProduct(deal: TopDeal): void {
    this.router.navigate(['/product', deal.productId]);
  }

}
