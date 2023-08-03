import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { StockService } from 'src/app/services/stock.service';
import { env } from 'src/env/env';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  loadingProduct: boolean = false;
  constructor(
    private dialog: MatDialog,
    private productService: StockService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loadingProduct = true;
    this.productService.getProducts().subscribe({
      next: (value: any) => {
        this.loadingProduct = false;
        this.products = value.data.map((item: any) => ({
          ...item,
          featureImage: env.resourceUrl + item.featureImage,
        }));
      },
      error: (err) => {
        this.loadingProduct = false;
        console.log(err);
      },
    });
  }

  openProdAdd() {
    this.dialog.open(CreateProductComponent, {
      width: '500px',
    });
  }
}
