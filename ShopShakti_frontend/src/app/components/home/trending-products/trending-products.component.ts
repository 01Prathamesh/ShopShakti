import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { TrendingProductService } from '../../../services/trending-product.service';

@Component({
  standalone: true,
  selector: 'app-trending-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './trending-products.component.html',
  styleUrl: './trending-products.component.css'
})
export class TrendingProductsComponent implements OnInit {
  trendingProducts: Product[] = [];

  constructor(private trendingService: TrendingProductService) {}

  ngOnInit(): void {
    this.trendingService.getTrendingProducts().subscribe(products => {
      this.trendingProducts = products;
    });
  }
}
