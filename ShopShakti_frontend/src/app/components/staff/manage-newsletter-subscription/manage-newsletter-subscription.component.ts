import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

@Component({
  standalone: true,
  selector: 'app-manage-newsletter-subscription',
  imports: [CommonModule],
  templateUrl: './manage-newsletter-subscription.component.html',
  styleUrl: './manage-newsletter-subscription.component.css'
})
export class ManageNewsletterSubscriptionComponent implements OnInit {
  subscribers: Subscriber[] = [];

  constructor(private http: HttpClient, private toast: ToastService) {}

  ngOnInit() {
    this.http.get<Subscriber[]>(`${environment.apiUrl}/Newsletter`).subscribe({
      next: data => this.subscribers = data,
      error: () => this.toast.show('Failed to load subscribers.', 'error')
    });
  }

  delete(id: number) {
    this.http.delete(`${environment.apiUrl}/Newsletter/${id}`).subscribe({
      next: () => {
        this.subscribers = this.subscribers.filter(s => s.id !== id);
        this.toast.show('Subscriber removed.', 'success');
      },
      error: () => this.toast.show('Failed to remove subscriber.', 'error')
    });
  }
}
