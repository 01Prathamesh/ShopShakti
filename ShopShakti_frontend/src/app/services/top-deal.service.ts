import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { TopDeal } from "../models/top-deal.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TopDealService {
  private apiUrl = `${environment.apiUrl}/TopDeals`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TopDeal[]> {
    return this.http.get<TopDeal[]>(this.apiUrl);
  }

  saveAll(deals: TopDeal[]): Observable<any> {
    return this.http.post(this.apiUrl, deals);
  }
}
