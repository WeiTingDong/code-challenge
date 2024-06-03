import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.component.html',
  styleUrl: './asset-info.component.scss'
})
export class AssetInfoComponent {
  @Input() name: string;
  @Input() value: string;
  @Input() unit: string;
  @Input() subtitle: string;

}
