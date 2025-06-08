import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-benefits',
  imports: [CommonModule, RouterModule],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.css'
})
export class BenefitsComponent {
  constructor(public router: Router, private http: HttpClient) {}
  benefits: any[] = [];

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/Benefits`).subscribe(data => {
      this.benefits = data;
    });
  }
}
