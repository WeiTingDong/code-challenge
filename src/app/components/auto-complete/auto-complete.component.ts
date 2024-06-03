import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Trie } from './trie';
import { CityInfo } from '@app/app.component';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent {
  @Input() wordList: CityInfo[];
  @Input() inputVal: string;

  @Output() inputValChange = new EventEmitter<string>();
  @Output() select = new EventEmitter<string>();

  trie: Trie;
  suggestions: string[];

  constructor() {
    this.trie = new Trie();
    this.suggestions = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const list = changes?.wordList?.currentValue;
    const input = changes?.inputVal?.currentValue;

    if (list?.length) {
      this.initializeTrie(list);
    }

    if (input) {
      this.onInputChange(input);
    } else {
      this.suggestions = [];
    }
  }

  initializeTrie(locations: any[]): void {
    this.trie = new Trie();
    locations.forEach((location) => this.trie.insert(location.name));
  }

  onInputChange(value: string): void {
    this.inputValChange.emit(value);

    if (
      this.suggestions.length === 1 &&
      this.suggestions[0].toLowerCase() === value.toLowerCase()
    ) {
      this.suggestions = [];
    } else {
      this.suggestions = this.trie.suggest(value);
    }
  }

  selectSuggestion(suggestion: string): void {
    this.inputVal = suggestion;
    this.inputValChange.emit(this.inputVal);
    this.select.emit(this.inputVal);

    this.suggestions = [suggestion]
  }
}
