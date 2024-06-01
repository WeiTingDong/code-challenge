import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrl: './overview-panel.component.scss',
})
export class OverviewPanelComponent {
  @Input() locationName: string;
  @Input() coordinates: [number, number];
  @Input() chartData: any; // todo

  radiationList: number[];
  timeList: string[];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'overview panel');
    const data = changes?.chartData?.currentValue?.hourly;
    if (data) {
      this.radiationList = data.direct_radiation;
      this.timeList = data.time.map((t) => t.split('T')[1]);
    }
  }
}
