import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrderSettingsService {
  private baseUrl = `${environment.apiUrl}/OrderSettings`;

  constructor(private http: HttpClient) {}

  getSettings(): Observable<{ shippingFee: number; tax: number }> {
    return this.http.get<{ shippingFee: number; tax: number }>(this.baseUrl);
  }

  updateSettings(settings: { shippingFee: number; tax: number }): Observable<void> {
    return this.http.put<void>(this.baseUrl, settings);
  }
}
