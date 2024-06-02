import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-icon',
  templateUrl: './search-icon.component.html',
  styleUrl: './search-icon.component.scss',
})
export class SearchIconComponent {
  @Output() click = new EventEmitter<void>();

  handleClick() {
    this.click.emit()
  }
}
