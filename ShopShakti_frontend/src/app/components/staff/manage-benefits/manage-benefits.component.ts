import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

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

  constructor(private http: HttpClient, private toast: ToastService) {}

  ngOnInit(): void {
    this.loadBenefits();
  }

  loadBenefits() {
    this.http.get<Benefit[]>(`${environment.apiUrl}/Benefits/all`).subscribe({
      next: data => this.benefits = data,
      error: () => this.toast.show('Failed to load benefits.', 'error')
    });
  }

  addBenefit() {
    this.http.post(`${environment.apiUrl}/Benefits`, this.newBenefit).subscribe({
      next: () => {
        this.loadBenefits();
        this.newBenefit = { iconClass: 'fa fa-star', title: '', description: '', isActive: true };
        this.toast.show('Benefit added successfully.', 'success');
      },
      error: () => this.toast.show('Failed to add benefit.', 'error')
    });
  }

  updateBenefit(b: Benefit) {
    this.http.put(`${environment.apiUrl}/Benefits/${b.id}`, b).subscribe({
      next: () => this.toast.show('Benefit updated.', 'success'),
      error: () => this.toast.show('Failed to update benefit.', 'error')
    });
  }

  deleteBenefit(id: number | undefined) {
    if (!id) return;
    this.http.delete(`${environment.apiUrl}/Benefits/${id}`).subscribe({
      next: () => {
        this.benefits = this.benefits.filter(b => b.id !== id);
        this.toast.show('Benefit deleted.', 'success');
      },
      error: () => this.toast.show('Failed to delete benefit.', 'error')
    });
  }
}
