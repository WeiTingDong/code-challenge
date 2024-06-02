import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { EnergyResponse } from '@services/energy.service';

@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrl: './detail-panel.component.scss',
})
export class DetailPanelComponent {
  @Input() locationName: string;
  @Input() coordinates: [number, number];
  @Input() chartData: EnergyResponse;

  @Output() closePanel = new EventEmitter<void>();

  radiationList: number[];
  timeList: string[];

  ngOnChanges(changes: SimpleChanges): void {
    const data = changes?.chartData?.currentValue?.hourly;
    if (data) {
      this.radiationList = data.direct_radiation;
      this.timeList = data.time.map((t) => t.split('T')[1]);
    }
  }

  handleClose(): void {
    this.closePanel.emit();
  }
}
