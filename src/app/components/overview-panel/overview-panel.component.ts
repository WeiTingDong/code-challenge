import { Component, Input, SimpleChanges } from '@angular/core';
import { EnergyResponse } from '@services/energy.service';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrl: './overview-panel.component.scss',
})
export class OverviewPanelComponent {
  @Input() locationName: string;
  @Input() coordinates: [number, number];
  @Input() chartData: EnergyResponse;
  @Input() loading: boolean = false;

  radiationList: number[];
  timeList: string[];

  ngOnChanges(changes: SimpleChanges): void {
    const data = changes?.chartData?.currentValue?.hourly;
    if (data) {
      this.radiationList = data.direct_radiation;
      this.timeList = data.time;
    }
  }
}
