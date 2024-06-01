import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

import { LocationService } from '@services/location.service';
import { environment } from '@environments/environment';
import { EnergyService } from '@services/energy.service';
// import { SearchBarComponent } from '@components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  map: L.Map;
  locationName: string = '';
  coordinates: number[] = [];

  constructor(
    private locationService: LocationService,
    private energyService: EnergyService
  ) {}

  ngOnInit() {
    this.initMap();
    this.fetchWeatherData();
  }

  private initMap(): void {
    this.map = L.map('map').setView([1.3521, 103.8198], 5); // todo

    L.tileLayer(environment.tileLayerUrl, {
      attribution: '&copy; lovely frog code challenge',
    }).addTo(this.map);
  }

  private fetchWeatherData(): void {
    this.locationService.getLocationList().subscribe((data) => {
      const markers = (L as any).markerClusterGroup();

      data?.area_metadata?.forEach((area) => {
        const { name, label_location } = area;
        const coords: L.LatLngTuple = [
          label_location.latitude,
          label_location.longitude,
        ];
        const marker = L.marker(coords).on('click', () => {
          this.fetchEnergyData(name, coords);
        });

        markers.addLayer(marker);
      });

      this.map.addLayer(markers);
    });
  }

  private fetchEnergyData(name: string, coords: L.LatLngTuple): void {
    const [latitude, longitude] = coords;
    const timezone = 'Asia/Singapore'; // todo
    const date = new Date().toISOString().split('T')[0]; // todo 

    this.energyService
      .getEnergy({ latitude, longitude, timezone, date })
      .subscribe((data) => {
        console.log(`Energy data for ${name}:`, data);
      });
  }
}
