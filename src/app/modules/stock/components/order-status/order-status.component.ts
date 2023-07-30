import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { env } from 'src/env/env';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  downloadRecipt() {
    let receiptUrl = env.resourceUrl + this.data.receiptUrl;
    window.open(receiptUrl);
  }
}
