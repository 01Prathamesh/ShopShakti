import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-top-deals',
  imports: [CommonModule, RouterModule],
  templateUrl: './top-deals.component.html',
  styleUrl: './top-deals.component.css'
})
export class TopDealsComponent {
  constructor(public router: Router) {}
  topDeals = [
    { name: 'Smartphone', image: 'assets/images/deals/phone.jpg', price: 11999 },
    { name: 'Sneakers', image: 'assets/images/deals/shoes.jpg', price: 2599 },
    { name: 'Washing Machine', image: 'assets/images/deals/wash.jpg', price: 15999 },
  ];

}
