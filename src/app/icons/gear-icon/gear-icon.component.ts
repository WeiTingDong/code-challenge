import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gear-icon',
  templateUrl: './gear-icon.component.html',
  styleUrl: './gear-icon.component.scss'
})
export class GearIconComponent {
  @Input() showBackground: boolean = true;

}
