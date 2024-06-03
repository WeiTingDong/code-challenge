import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import apiUrls from './api';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = apiUrls.locationUrl;

  constructor(private http: HttpClient) {}

  getLocationList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
