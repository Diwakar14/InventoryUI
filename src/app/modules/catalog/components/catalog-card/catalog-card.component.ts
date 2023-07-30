import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
})
export class CatalogCardComponent {
  @Input()
  catalog: any;
}
