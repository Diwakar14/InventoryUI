import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.scss'],
})
export class AddCatalogComponent {
  addingCatalog: boolean = false;
  cForm = this.fb.group({});
  constructor(private fb: FormBuilder) {}

  addCatalog() {}
}
