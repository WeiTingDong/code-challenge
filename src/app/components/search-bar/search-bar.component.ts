import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CityInfo } from '@app/app.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() cityList: CityInfo[]; // todo: use state management
  @Output() searchCity = new EventEmitter<String>();

  inputVal: string;

  handleSearch() {
    if (this.inputVal.length > 50) {
      alert('Content is too long');
    } else {
      this.searchCity.emit(this.inputVal);
    }
  }
}
