import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

import { LocationService } from '@services/location.service';
import { environment } from '@environments/environment';
import { EnergyService, EnergyResponse } from '@services/energy.service';

interface CityInfo {
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
export class AppComponent {
  map: L.Map;
  cities: CityInfo[];
  locationName: string = '';
  coordinates: number[] = [];
  detailData: EnergyResponse;
  showDetail: boolean = false;
  showOverview: boolean = false;

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
    this.locationService.getLocationList().subscribe((data) => {
      const markers = (L as any).markerClusterGroup();

      this.cities = data?.area_metadata?.map((area) => {
        const { name, label_location } = area;
        const coords: L.LatLngTuple = [
          label_location.latitude,
          label_location.longitude,
        ];
        const marker = L.marker(coords).on('click', () => {
          this.fetchEnergyData(coords);
          this.coordinates = coords;
          this.locationName = name;
          this.showDetail = true;
        });

        markers.addLayer(marker);

        return {
          name,
          coords,
          timezone,
        };
      });

      this.map.addLayer(markers);
    });
  }

  closeDetail(): void {
    this.showDetail = false;
    this.detailData = null;
  }

  handleSearchCity(targetCity: string): void {
    const { name, coords } = this.getCityCoords(targetCity); // todo 考虑空值
    this.fetchEnergyData(coords);

    this.map.setView(coords, searchScale);

    this.coordinates = coords;
    this.locationName = name;
    this.showOverview = true;
  }

  private fetchEnergyData(coords: L.LatLngTuple): void {
    const [latitude, longitude] = coords;
    const date = new Date().toISOString().split('T')[0]; // todo
    // todo loading效果
    this.energyService
      .getEnergy({ latitude, longitude, timezone, date })
      .subscribe((data) => {
        this.detailData = data;
      });
  }

  private getCityCoords(name: string = ''): CityInfo {
    return this.cities.filter(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    )[0];
  }
}
