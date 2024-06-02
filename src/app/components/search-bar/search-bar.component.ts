import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() cityList: any[]; // todo 最好直接用状态管理
  @Output() searchCity = new EventEmitter<String>();

  inputVal: string; // todo 限长

  handleSearch() {
    this.searchCity.emit(this.inputVal);
  }
}
