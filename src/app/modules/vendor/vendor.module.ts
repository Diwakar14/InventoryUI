import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { SharedModule } from '../shared.module';
import { AddBatchComponent } from './components/add-batch/add-batch.component';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [VendorComponent, AddBatchComponent, AddVendorComponent],
  imports: [CommonModule, VendorRoutingModule, SharedModule],
  exports: [SharedModule],
})
export class VendorModule {}
