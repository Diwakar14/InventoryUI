import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from './components/create-product/create-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  constructor(private dialog: MatDialog) {}
  openProdAdd() {
    this.dialog.open(CreateProductComponent, {
      width: '400px',
    });
  }
}
