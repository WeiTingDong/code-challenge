import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoard } from './dashboard.enum';

type TabInfo = { name: string; key: DashBoard };

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @Output() subjectChange = new EventEmitter<DashBoard>();

  constructor() {}

  itemList: TabInfo[] = [
    {
      name: 'efficiency',
      key: DashBoard.EFFICIENCY,
    },
    {
      name: 'stringPerf',
      key: DashBoard.STRING_PERF,
    },
    {
      name: 'powerCurve',
      key: DashBoard.POWER_CURVE,
    },
    {
      name: 'soilLoss',
      key: DashBoard.SOILING,
    },
    {
      name: 'clipLoss',
      key: DashBoard.CLIPPING,
    },
  ];

  selectTab(i: TabInfo) {
    this.subjectChange.emit(i.key);
  }
}
