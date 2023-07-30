import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Batch } from 'src/app/models/Batch';
import { BatchService } from 'src/app/services/batch.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss'],
})
export class AddBatchComponent {
  addingBatch: boolean = false;
  batches: any[] = [];
  bForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  constructor(public fb: FormBuilder, private batchService: BatchService) {}

  addBatch() {
    var batch: Batch = {
      name: this.bForm.controls.name.value || '',
      description: this.bForm.controls.description.value || '',
    };

    this.addingBatch = true;
    this.batchService.createBatchs(batch).subscribe({
      next: (value: any) => {
        this.batches = value.data;
        this.addingBatch = false;
      },
      error: (err) => {
        this.addingBatch = false;
      },
    });
  }
}
