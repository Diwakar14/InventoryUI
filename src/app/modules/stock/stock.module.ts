import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { SharedModule } from '../shared.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';

@NgModule({
  declarations: [StockComponent, AddProductComponent, CreateOrderComponent, AddCustomerComponent, OrderStatusComponent],
  imports: [
    StockRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    SharedModule,
  ],
  exports: [SharedModule],
})
export class StockModule {}
