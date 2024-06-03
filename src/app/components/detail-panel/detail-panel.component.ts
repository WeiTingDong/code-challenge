import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { EnergyResponse } from '@services/energy.service';
import { DashBoard } from '../dashboard/dashboard.enum';

@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrl: './detail-panel.component.scss',
})
export class DetailPanelComponent {
  @Input() locationName: string;
  @Input() coordinates: [number, number];
  @Input() chartData: EnergyResponse;
  @Input() loading: boolean = false;

  @Output() closePanel = new EventEmitter<void>();

  activeTab: DashBoard = DashBoard.EFFICIENCY;
  DashBoard = DashBoard;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.locationName) {
      this.activeTab = DashBoard.EFFICIENCY;
    }
  }

  handleClose(): void {
    this.closePanel.emit();
  }

  handleTabChange(tab): void {
    this.activeTab = tab;
  }
}
