import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() searchCity = new EventEmitter<String>();

  inputVal: string; // todo 限长

  handleSearch() {
    this.searchCity.emit(this.inputVal)
  }
}
