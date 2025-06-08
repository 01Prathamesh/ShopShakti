import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Subscriber[]>(`${environment.apiUrl}/Newsletter`).subscribe(data => {
      this.subscribers = data;
    });
  }

  delete(id: number) {
    this.http.delete(`${environment.apiUrl}/Newsletter/${id}`).subscribe(() => {
      this.subscribers = this.subscribers.filter(s => s.id !== id);
    });
  }
}
