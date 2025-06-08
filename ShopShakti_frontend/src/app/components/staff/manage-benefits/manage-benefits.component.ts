import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

interface Benefit {
  id?: number;
  iconClass: string;
  title: string;
  description: string;
  isActive: boolean;
}

@Component({
  selector: 'app-manage-benefits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-benefits.component.html',
  styleUrl: './manage-benefits.component.css'
})
export class ManageBenefitsComponent implements OnInit {
  benefits: Benefit[] = [];
  newBenefit: Benefit = {
    iconClass: 'fa fa-star',
    title: '',
    description: '',
    isActive: true
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBenefits();
  }

  loadBenefits() {
    this.http.get<Benefit[]>(`${environment.apiUrl}/Benefits/all`).subscribe(data => {
      this.benefits = data;
    });
  }

  addBenefit() {
    this.http.post(`${environment.apiUrl}/Benefits`, this.newBenefit).subscribe(() => {
      this.loadBenefits();
      this.newBenefit = { iconClass: 'fa fa-star', title: '', description: '', isActive: true };
    });
  }

  updateBenefit(b: Benefit) {
    this.http.put(`${environment.apiUrl}/Benefits/${b.id}`, b).subscribe();
  }

  deleteBenefit(id: number | undefined) {
    if (!id) return;
    this.http.delete(`${environment.apiUrl}/Benefits/${id}`).subscribe(() => {
      this.benefits = this.benefits.filter(b => b.id !== id);
    });
  }
}
