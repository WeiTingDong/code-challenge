import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-performance-info',
  templateUrl: './performance-info.component.html',
  styleUrl: './performance-info.component.scss',
})
export class PerformanceInfoComponent {
  @Input() performance;
  @Input() inverter;
}
