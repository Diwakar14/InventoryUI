import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qty-selector',
  templateUrl: './qty-selector.component.html',
  styleUrls: ['./qty-selector.component.scss'],
})
export class QtySelectorComponent {
  @Input()
  qty: number = 0;

  @Output() qtyChange = new EventEmitter<number>();

  increment() {
    this.qty++;
    this.qtyChange.emit(this.qty);
  }

  descrement() {
    this.qty--;
    this.qtyChange.emit(this.qty);
  }
}
