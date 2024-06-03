import { Component, Input, SimpleChanges } from '@angular/core';
import { EnergyResponse } from '@services/energy.service';

@Component({
  selector: 'app-inverter-efficiency',
  templateUrl: './inverter-efficiency.component.html',
  styleUrl: './inverter-efficiency.component.scss',
})
export class InverterEfficiencyComponent {
  @Input() locationName: string;
  @Input() coordinates: [number, number];
  @Input() chartData: EnergyResponse;
  @Input() loading: boolean = false;

  radiationList: number[];
  timeList: string[];

  chartConfig = {
    areaStyle: {
      color: '#2fc7d5',
    },
    lineStyle: {
      color: '#00dbda',
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    const data = changes?.chartData?.currentValue?.hourly;
    if (data) {
      this.radiationList = data.direct_radiation;
      this.timeList = data.time.map((t) => t.split('T')[1]);
    }
  }
}
