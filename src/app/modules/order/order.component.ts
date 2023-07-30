import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { env } from 'src/env/env';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  envBaseUrl = env.resourceUrl;
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    let params = new HttpParams().set('Order', 'desc');
    this.orderService.getOrders(params).subscribe({
      next: (value: any) => {
        if (value.status == 200) {
          this.orders = value.data;
        }
      },
    });
  }
}
