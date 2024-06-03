import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import * as L from 'leaflet';
import 'leaflet.markercluster';

import { LocationService } from '@services/location.service';
import { environment } from '@environments/environment';
import { EnergyService, EnergyResponse } from '@services/energy.service';

L.Icon.Default.imagePath = 'assets/images/';

export interface CityInfo {
  name: string;
  coords: [number, number];
  timezone: string;
}

const timezone = 'Asia/Singapore';
const originCenter = [1.3521, 103.8198] as L.LatLngTuple;
const originScale = 5;
const searchScale = 13;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  map: L.Map;
  cities: CityInfo[];
  locationName: string = '';
  coordinates: number[] = [];
  detailData: EnergyResponse;
  showDetail: boolean = false;
  showOverview: boolean = false;

  isLoadingEnergy: boolean = false;
  isLoadingLocation: boolean = false;

  private searchSubject = new Subject<L.LatLngTuple>();

  constructor(
    private translate: TranslateService,
    private locationService: LocationService,
    private energyService: EnergyService
  ) {
    this.translate.addLangs(['en', 'zh']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.initMap();
    this.fetchLocationData();
    
    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(coords => this.energyService.getEnergy({
        latitude: coords[0],
        longitude: coords[1],
        timezone,
        date: new Date().toISOString().split('T')[0]
      }))
    ).subscribe({
      next: (data) => {
        this.detailData = data;
        this.isLoadingEnergy = false;
      },
      error: (error) => {
        console.error('Fetch failed: ', error);
        this.isLoadingEnergy = false;
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      zoomControl: false,
      attributionControl: false,
    }).setView(originCenter, originScale);

    L.tileLayer(environment.tileLayerUrl, {
      minZoom: 2,
    }).addTo(this.map);
  }

  private fetchLocationData(): void {
    this.isLoadingLocation = true;
    this.locationService.getLocationList().subscribe({
      next: (data) => {
        const markers = (L as any).markerClusterGroup();

        this.cities = data?.area_metadata?.map((area) => {
          const { name, label_location } = area;
          const coords: L.LatLngTuple = [
            label_location.latitude,
            label_location.longitude,
          ];
          const marker = L.marker(coords).on('click', () => {
            this.coordinates = coords;
            this.locationName = name;
            this.showDetail = true;
            this.fetchEnergyData(coords);
          });

          markers.addLayer(marker);

          return {
            name,
            coords,
            timezone,
          };
        });

        this.map.addLayer(markers);
        this.isLoadingLocation = false;
      },
      error: (error) => {
        console.error('Fetch failed: ', error);
        this.isLoadingLocation = false;
      },
    });
  }

  closeDetail(): void {
    this.showDetail = false;
    this.detailData = null;
  }

  handleSearchCity(targetCity: string): void {
    try {
      const { name, coords } = this.getCityCoords(targetCity);
      this.map.setView(coords, searchScale);
  
      this.coordinates = coords;
      this.locationName = name;
      this.showOverview = true;
      this.fetchEnergyData(coords);
    } catch {
      console.error("Fail to find location")
      alert(`Fail to find ${targetCity}, which is not in Singapore`)
    }
  }

  private fetchEnergyData(coords: L.LatLngTuple): void {
    this.isLoadingEnergy = true;
    this.searchSubject.next(coords);
  }

  private getCityCoords(name: string = ''): CityInfo {
    return this.cities.filter(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    )[0];
  }
}
