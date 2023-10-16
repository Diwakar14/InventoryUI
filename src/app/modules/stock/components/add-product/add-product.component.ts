import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { CatalogService } from 'src/app/services/catalog.service';
import { StockService } from 'src/app/services/stock.service';
import { VendorService } from 'src/app/services/vendor.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BatchService } from 'src/app/services/batch.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  catalogs: any[] = [];
  vendors: any[] = [];
  batches: any[] = [];
  products: any[] = [];

  isVariant: boolean = false;
  isLoading: boolean = false;
  isSearchingCat: boolean = false;
  isSearchingVend: boolean = false;
  loadingBatches: boolean = false;
  loadingVendors: boolean = false;
  loadingCatalogs: boolean = false;

  additionalChargeControls = this.fb.group({
    text: ['GST', Validators.required],
    value: ['3', Validators.required],
    valueType: ['Percentage', Validators.required],
  });

  pForm = this.fb.group({
    salePrice: [0, Validators.required],
    actualPrice: [0, Validators.required],
    stock: [0, Validators.required],
    catalogId: [0, Validators.required],
    vendorId: [0, Validators.required],
    batchId: [0, Validators.required],
    productId: [0, Validators.required],
    charges: this.fb.array([this.additionalChargeControls]),
  });

  get additionalCharges() {
    return this.pForm?.get('charges') as FormArray;
  }

  constructor(
    public catalogService: CatalogService,
    public vendorService: VendorService,
    public productService: StockService,
    public batchService: BatchService,
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getVendors();
  }

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

  getCatalog(catalogId: number) {
    this.loadingCatalogs = false;
    this.catalogService.getCatalog(catalogId).subscribe({
      next: (value: any) => {
        this.products = value.data.products.map((i: any) => ({
          id: i.id,
          name: i.name,
        }));
        this.loadingCatalogs = true;
      },
      error: (err) => {
        console.log(err);
        this.loadingCatalogs = false;
      },
    });
  }

  getBatch(batchId: number) {
    this.loadingBatches = false;
    this.batchService.getBatch(batchId).subscribe({
      next: (value: any) => {
        this.catalogs = value.data.catagories.map((i: any) => ({
          id: i.id,
          name: i.name,
        }));
        this.loadingBatches = true;
      },
      error: (err) => {
        console.log(err);
        this.loadingBatches = false;
      },
    });
  }

  handleToggle() {
    this.isVariant = !this.isVariant;
  }

  handleSubmit() {
    let form = this.pForm;
    console.log(form.value);

    if (form.valid) {
      let f = form.value;
      console.log(f);

      let prod = {
        batchId: f.batchId,
        productId: f.productId,
        vendorId: f.vendorId,
        categoryId: f.catalogId,
        price: {
          salePrice: f.salePrice,
          costPrice: f.actualPrice,
        },
        charges: f.charges?.map((c) => {
          return {
            key: c.text,
            value: c.value,
            valueType: c.valueType,
          };
        }),
        stock: {
          base: f.stock,
          current: f.stock,
        },
      };
      this.isLoading = true;

      this.inventoryService.create(prod).subscribe({
        next: (value) => {
          this.isLoading = false;
          console.log(value);
          this.dialogRef.close(value);
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  displaySelect(value: any): any {
    return value.name;
  }

  addMoreCharges() {
    this.additionalCharges.push(
      this.fb.group({
        text: ['', Validators.required],
        value: ['', Validators.required],
        valueType: ['Percentage', Validators.required],
      })
    );
  }

  handleVendorSelected(event: any) {
    console.log(event);

    this.pForm.controls.vendorId.setValue(event.id);
    this.getVendor(event.id);
  }

  handleBatchSelected(event: any) {
    this.pForm.controls.batchId.setValue(event.id);
    this.getBatch(event.id);
  }

  handleCatalogSelected(event: any) {
    this.pForm.controls.catalogId.setValue(event.id);
    this.getCatalog(event.id);
  }

  handleProductSelected(event: any) {
    this.pForm.controls.productId.setValue(event.id);
  }

  removeCharges(i: number) {
    this.additionalCharges.removeAt(i);
  }
}
