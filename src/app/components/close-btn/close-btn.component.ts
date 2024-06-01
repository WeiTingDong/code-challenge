import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrl: './close-btn.component.scss',
})
export class CloseBtnComponent {
  @Output() close = new EventEmitter<void>();

  handleClose() {
    this.close.emit()
  }
}
