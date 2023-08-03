import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VendorService } from 'src/app/services/vendor.service';
import { Vendor } from '../../models/Vendor';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SlideIn } from 'src/app/animations/SlideIn';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss'],
  animations: [SlideIn],
})
export class AddVendorComponent {
  addingVendor: boolean = false;
  vForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.required],
    address: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private dialogRef: MatDialogRef<AddVendorComponent>
  ) {}

  getControl(controlName: string) {
    return this.vForm.get(controlName);
  }

  addVendor() {
    var f = this.vForm.controls;

    if (this.vForm.invalid) {
      this.vForm.markAllAsTouched();
      return;
    }
    var vendor: Vendor = {
      name: f.name.value || '',
      email: f.email.value || '',
      phone: f.phone.value + '' || '',
      address: f.address.value || '',
    };

    this.addingVendor = true;
    this.vendorService.createVendors(vendor).subscribe({
      next: (value) => {
        this.addingVendor = false;
        this.dialogRef.close(value);
      },
      error: (val) => {
        console.log(val);
        this.addingVendor = false;
      },
    });
  }
}
