import { Component, Input } from '@angular/core';
import * as L from 'leaflet';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.scss',
})
export class MinimapComponent {
  @Input() coords: [number, number];
  private minimap: L.Map;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMinimap();
  }

  private initMinimap(): void {
    this.minimap = L.map('minimap', {
      center: this.coords,
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    });

    this.minimap.dragging.disable();
    this.minimap.touchZoom.disable();

    L.tileLayer(environment.tileLayerUrl, {
      // maxZoom: 18,
      // minZoom: 15,
    }).addTo(this.minimap);

    // L.marker(this.coords).addTo(this.minimap);
  }
}
