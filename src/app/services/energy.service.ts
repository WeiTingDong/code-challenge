import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  getEnergy({latitude, longitude, timezone, date}): Observable<any> { // todo 确认一下这个date到底是什么范围
    return this.http.get<any>(`${this.apiUrl}?latitude=${latitude}&longitude=${longitude}&hourly=direct_radiation&timezone=${timezone}&start_date=${date}&end_date=${date}`);
  }
}
