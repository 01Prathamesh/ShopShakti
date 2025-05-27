import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminMetricsDto } from './admin-matrics.dto';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = 'https://localhost:7171/api/Admin/metrics';

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<AdminMetricsDto> {
    return this.http.get<AdminMetricsDto>(this.apiUrl);
  }
}
