import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';

  constructor(private http: HttpClient) { }

  getLocationList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
