import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '../shared.module';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ProductComponent, CreateProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MatSlideToggleModule,
  ],
  exports: [SharedModule, MatSlideToggleModule],
})
export class ProductModule {}
