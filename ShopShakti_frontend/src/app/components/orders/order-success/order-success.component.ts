import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-order-success',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent {

}
