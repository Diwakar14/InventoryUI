import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SlideIn } from 'src/app/animations/SlideIn';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.scss'],
  animations: [SlideIn],
})
export class AddCatalogComponent {
  addingCatalog: boolean = false;
  cForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });
  formData = new FormData();
  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private dialogRef: MatDialogRef<AddCatalogComponent>
  ) {}

  get name() {
    return this.cForm.controls.name;
  }

  addCatalog() {
    console.log(this.cForm.value);
    this.formData.append('name', this.cForm.controls.name.value || '');
    this.formData.append(
      'description',
      this.cForm.controls.description.value || ''
    );

    this.addingCatalog = true;
    this.catalogService.createCatalogs(this.formData).subscribe({
      next: (value) => {
        console.log(value);
        this.addingCatalog = false;
        this.dialogRef.close(value);
      },
      error: (err) => {
        this.addingCatalog = false;
      },
    });
  }

  handleImageSelect(file: any[]) {
    this.formData.append('icon', file[0].file || '');
  }
}
