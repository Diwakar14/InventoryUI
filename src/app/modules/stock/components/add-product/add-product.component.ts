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
import { ExtraCharge, Product } from '../../models/Product';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  catalogs: any[] = [];
  vendors: any[] = [];
  isVariant: boolean = false;
  isLoading: boolean = false;
  isSearchingCat: boolean = false;
  isSearchingVend: boolean = false;

  additionalChargeControls = this.fb.group({
    text: ['', Validators.required],
    value: ['', Validators.required],
    valueType: ['Percentage', Validators.required],
  });

  pForm = this.fb.group({
    name: ['', Validators.required],
    salePrice: [0, Validators.required],
    actualPrice: [0, Validators.required],
    stock: [0, Validators.required],
    description: [''],
    catalogId: [0, Validators.required],
    vendorId: [0, Validators.required],
    batchId: [0, Validators.required],
    active: [true, Validators.required],
    parentProduct: this.fb.group({
      addParentProduct: [false],
      pProductId: [],
    }),
    addCharges: this.fb.group({
      hasAddCharge: [false],
      charges: this.fb.array([this.additionalChargeControls]),
    }),
  });

  get additionalCharges() {
    return this.pForm.get('addCharges')?.get('charges') as FormArray;
  }

  constructor(
    public catalogService: CatalogService,
    public vendorService: VendorService,
    public productService: StockService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    public fb: FormBuilder
  ) {}

  selectedValue: string;
  selectedCar: string;

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  cars: any[] = [
    { value: 'volvo', viewValue: 'Volvo' },
    { value: 'saab', viewValue: 'Saab' },
    { value: 'mercedes', viewValue: 'Mercedes' },
  ];

  ngOnInit() {
    this.getCatalogs();
    this.getVendors();
  }

  getCatalogs() {
    this.catalogService.getCatalogs().subscribe({
      next: (value: any) => {
        this.catalogs = value.data.map((i: any) => ({
          id: i.id,
          name: i.name,
        }));
      },
      error: (err) => {},
    });
  }

  getVendors() {
    this.vendorService.getVendors().subscribe({
      next: (value: any) => {
        this.vendors = value.data.map((i: any) => ({ id: i.id, name: i.name }));
      },
    });
  }

  handleToggle() {
    this.isVariant = !this.isVariant;
  }

  handleSubmit() {
    let form = this.pForm;
    console.log(form.value);
    this.isLoading = true;

    if (form.valid) {
      let f = form.value;
      let product: Product = {
        name: f.name || '',
        description: f.description || '',
        salePrice: f.salePrice || 0,
        actualPrice: f.actualPrice || 0,
        stock: f.stock || 0,
        parentId: f.parentProduct?.pProductId || 0,
        extraCharge: f.addCharges?.charges as Array<any>,
        active: f.active || false,
        catalogId: f.catalogId || 0,
        vendorId: f.vendorId || 0,
        currency: '₹',
      };

      console.log(product);

      // this.productService.createProducts(product).subscribe({
      //   next: (value) => {
      //     this.isLoading = false;
      //     this.dialogRef.close(value);
      //   },
      // });
    } else {
      this.isLoading = false;
    }
  }

  displaySelect(value: any): any {
    return value.name;
  }

  addMoreCharges() {
    this.additionalCharges.push(this.additionalChargeControls);
  }

  handleCatalogSelected(event: any) {
    this.pForm.controls.catalogId.setValue(event.id);
  }
  handleVendorSelected(event: any) {
    this.pForm.controls.vendorId.setValue(event.id);
  }
  handleProductSelected(event: any) {
    this.pForm.controls.parentProduct.controls.pProductId.setValue(event.id);
  }

  removeCharges(i: number) {
    this.additionalCharges.removeAt(i);
  }
}
