import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnergyResponse {
  elevation: number;
  generationtime_ms: number;
  hourly: {
    direct_radiation: number[];
    time: string[];
  },
  hourly_units: {
    time: string;
    direct_radiation: string;
  },
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

@Injectable({
  providedIn: 'root'
})

export class EnergyService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  getEnergy({latitude, longitude, timezone, date}): Observable<EnergyResponse> {
    return this.http.get<EnergyResponse>(`${this.apiUrl}?latitude=${latitude}&longitude=${longitude}&hourly=direct_radiation&timezone=${timezone}&start_date=${date}&end_date=${date}`);
  }
}
