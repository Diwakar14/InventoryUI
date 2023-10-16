import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BatchService } from 'src/app/services/batch.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { StockService } from 'src/app/services/stock.service';
import { VendorService } from 'src/app/services/vendor.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.scss'],
})
export class UpdateInventoryComponent {
  catalogs: any[] = [];
  vendors: any[] = [];
  batches: any[] = [];
  products: any[] = [];

  isLoading: boolean = false;
  loadingBatches: boolean = false;
  loadingVendors: boolean = false;
  loadingCatalogs: boolean = false;

  pForm = this.fb.group({
    catalogId: [0, Validators.required],
    vendorId: [0, Validators.required],
    batchId: [0, Validators.required],
    productId: [0, Validators.required],
  });
  constructor(
    public catalogService: CatalogService,
    public vendorService: VendorService,
    public productService: StockService,
    public batchService: BatchService,
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private toaster: ToastrService,
    public fb: FormBuilder
  ) {}

  getVendors() {
    this.vendorService.getVendors().subscribe({
      next: (value: any) => {
        this.vendors = value.data.map((i: any) => ({ id: i.id, name: i.name }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getVendor(vendorId: number) {
    this.loadingVendors = false;
    this.vendorService.getVendor(vendorId).subscribe({
      next: (value: any) => {
        this.batches = value.data?.batches.map((i: any) => ({
          id: i.id,
          name: i.name,
        }));
        this.loadingVendors = true;
      },
      error: (err) => {
        console.log(err);
        this.loadingVendors = false;
      },
    });
  }

  handleSubmit() {
    let form = this.pForm;

    if (form.valid) {
      let f = form.value;
      let prod = {
        batchId: f.batchId,
        productId: f.productId,
        vendorId: f.vendorId,
        categoryId: f.catalogId,
      };
      this.isLoading = true;

      this.inventoryService.update(prod).subscribe({
        next: (value) => {
          this.isLoading = false;
          this.dialogRef.close(value);
          this.toaster.success('Inventory Updated', 'Inventory');
        },
        error: (err) => {
          console.log(err);
          this.toaster.error(err.error.message, 'Inventory');
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  handleVendorSelected(event: any) {
    console.log(event);

    this.pForm.controls.vendorId.setValue(event.id);
    this.getVendor(event.id);
  }

  handleBatchSelected(event: any) {
    this.pForm.controls.batchId.setValue(event.id);
  }

  handleCatalogSelected(event: any) {
    this.pForm.controls.catalogId.setValue(event.id);
  }

  handleProductSelected(event: any) {
    this.pForm.controls.productId.setValue(event.id);
  }
}
