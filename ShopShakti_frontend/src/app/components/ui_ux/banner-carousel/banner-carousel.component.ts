import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-banner-carousel',
  imports: [CommonModule],
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.css'
})
export class BannerCarouselComponent {
  banners = [
    { image: 'assets/images/banners/banner1.jpg', title: 'Big Sale!', subtitle: 'Up to 70% off on top brands' },
    { image: 'assets/images/banners/banner2.jpg', title: 'New Arrivals', subtitle: 'Check out the latest collection' },
    { image: 'assets/images/banners/banner3.jpg', title: 'Festive Offers', subtitle: 'Celebrate with special deals' }
  ];
  activeIndex = 0;

  ngOnInit() {
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.banners.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.banners.length) % this.banners.length;
  }
}
