import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SlideIn } from 'src/app/animations/SlideIn';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  animations: [SlideIn],
})
export class CreateProductComponent {
  addingProduct: boolean = false;
  images: any[] = [];

  addAttr = this.fb.group({
    text: [''],
    value: [''],
  });

  pForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    active: [true],
    addAttributes: this.fb.array([this.addAttr]),
  });

  get attributes() {
    return this.pForm.controls.addAttributes as FormArray;
  }

  get name() {
    return this.pForm.controls.name;
  }

  constructor(
    private fb: FormBuilder,
    private productService: StockService,
    private dialog: MatDialogRef<CreateProductComponent>
  ) {}

  handleSelectedFiles(files: any[]) {
    this.images = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.images.push({ ...files[i] });
      }
    }
  }

  addMoreCharges() {
    this.pForm.controls.addAttributes.push(this.addAttr);
  }

  updateFormData(images: any[], formData: FormData) {
    for (let i = 0; i < images.length; i++) {
      const element = images[i];
      if (element.featured) {
        formData.append('FeatureImage', element.file);
      }
      formData.append('Images', element.file);
    }
    return formData;
  }

  createProduct() {
    let f = this.pForm.controls;
    if (this.pForm.invalid) return this.pForm.markAllAsTouched();

    let formData = new FormData();
    formData.append('Name', f.name.value || '');
    formData.append('Description', f.description.value || '');
    formData.append('Active', f.active.value + '');
    formData.append('Attributes', JSON.stringify(f.addAttributes.value));
    formData = this.updateFormData(this.images, formData);

    this.addingProduct = true;
    this.productService.createProducts(formData).subscribe({
      next: (value) => {
        this.addingProduct = false;
        this.dialog.close(value);
      },
      error: (err) => {
        this.addingProduct = false;
      },
    });
  }

  removeAttr(i: number) {
    this.pForm.controls.addAttributes.removeAt(i);
  }
}
