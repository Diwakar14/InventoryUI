import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Batch } from 'src/app/models/Batch';
import { BatchService } from 'src/app/services/batch.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss'],
})
export class AddBatchComponent {
  addingBatch: boolean = false;
  bForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    vendorId: [0, Validators.required],
  });

  constructor(
    public fb: FormBuilder,
    private batchService: BatchService,
    public vendorService: VendorService,
    private dialog: MatDialogRef<AddBatchComponent>
  ) {}

  addBatch() {
    if (this.bForm.invalid) return this.bForm.markAllAsTouched();

    var batch: Batch = {
      name: this.bForm.controls.name.value || '',
      description: this.bForm.controls.description.value || '',
      vendorId: this.bForm.controls.vendorId.value || 0,
    };

    this.addingBatch = true;
    this.batchService.createBatchs(batch).subscribe({
      next: (value: any) => {
        this.addingBatch = false;
        this.dialog.close(value);
      },
      error: (err) => {
        this.addingBatch = false;
      },
    });
  }
  handleVendorSelect(vendor: any) {
    this.bForm.controls.vendorId.setValue(vendor.id);
  }
}
