import { Component, OnInit } from '@angular/core';
import { TopDealService } from '../../../services/top-deal.service';
import { TopDeal } from '../../../models/top-deal.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-manage-top-deals',
  templateUrl: './manage-top-deals.component.html',
  styleUrl: './manage-top-deals.component.css',
  imports: [CommonModule, FormsModule]
})
export class ManageTopDealsComponent implements OnInit {
  topDeals: TopDeal[] = [];
  products: Product[] = [];
  activeIndex: number = -1;

  constructor(private topDealService: TopDealService, private productService: ProductService, private toast: ToastService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.topDealService.getAll().subscribe(deals => this.topDeals = deals);
      },
      error: () => alert('Failed to load data')
    });
  }

  onProductNameChange(index: number, name: string): void {
    const match = this.products.find(p => p.name.trim().toLowerCase() === name.trim().toLowerCase());
    if (match) {
      this.topDeals[index].imageUrl = match.imageUrl;
      this.topDeals[index].price = match.price;
      this.topDeals[index].productId = match.id;
    }
  }

  getSuggestions(input: string): string[] {
    if (!input) return [];
    return this.products
      .map(p => p.name)
      .filter(name => name.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5);
  }

  selectSuggestion(index: number, suggestion: string): void {
    this.topDeals[index].name = suggestion;
    this.onProductNameChange(index, suggestion);
    this.activeIndex = -1;
  }

  addDeal(): void {
    this.topDeals.push({ name: '', imageUrl: '', price: 0, productId: 0 });
  }

  removeDeal(index: number): void {
    this.topDeals.splice(index, 1);
  }

  saveDeals(): void {
    const invalid = this.topDeals.some(deal => !deal.productId || deal.productId <= 0);

    if (invalid) {
      this.toast.show('Please select valid products for all deals.', 'error', 4000);
      return;
    }

    this.topDealService.saveAll(this.topDeals).subscribe({
      next: () => {
        this.toast.show('Top deals saved successfully!', 'success', 3000);
      },
      error: () => {
        this.toast.show('Failed to save top deals. Please try again.', 'error', 4000);
      }
    });
  }

  hideSuggestionsWithDelay(): void {
    setTimeout(() => {
      this.activeIndex = -1;
    }, 200);
  }

}
