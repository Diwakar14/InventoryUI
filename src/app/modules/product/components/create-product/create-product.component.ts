import { Component } from '@angular/core';
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

  addAttr = this.fb.group({
    text: ['', Validators.required],
    value: ['', Validators.required],
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

  formData = new FormData();

  constructor(
    private fb: FormBuilder,
    private productService: StockService,
    private dialog: MatDialogRef<CreateProductComponent>
  ) {}

  handleFileChange(fileInput: HTMLInputElement) {
    if (fileInput.files) {
      for (let i = 0; i < fileInput.files.length; i++) {
        this.formData.append('images[' + i + ']', fileInput.files[i]);
      }
    }
  }

  handleSelectedFiles(event: any) {
    console.log(event);
  }

  addMoreCharges() {
    this.pForm.controls.addAttributes.push(this.addAttr);
  }

  createProduct() {
    let f = this.pForm.controls;
    if (this.pForm.invalid) return this.pForm.markAllAsTouched();

    this.formData.append('name', f.name.value || '');
    this.formData.append('description', f.description.value || '');
    this.formData.append('active', f.active.value + '');

    this.addingProduct = true;
    this.productService.createProducts(this.formData).subscribe({
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
