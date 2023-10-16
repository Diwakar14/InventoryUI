import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { StockService } from 'src/app/services/stock.service';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { Sort } from '@angular/material/sort';
import { ComponentType } from 'src/app/components/ComponentType';
import { SidePanelService } from 'src/app/components/side-panel/side-panel.service';
import { UpdateStockComponent } from './components/update-stock/update-stock.component';
import { UpdateInventoryComponent } from './components/update-inventory/update-inventory.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  products: any[] = [];
  sortedProducts: any[] = [];
  loadingProduct: boolean = false;
  constructor(
    private dialog: MatDialog,
    private productService: StockService,
    private sidebarService: SidePanelService
  ) {}

  ngOnInit(): void {
    this.loadingProduct = true;
    this.productService.getStocks().subscribe({
      next: (value: any) => {
        this.products = value.data;
        this.sortedProducts = value.data;
        this.loadingProduct = false;
      },
      error: (err) => {
        this.loadingProduct = false;
      },
    });
  }

  openAddProduct() {
    let dialogRef = this.dialog.open(AddProductComponent, {
      width: '600px',
      disableClose: true,
      id: 'add-product-dialog',
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          console.log(value);
        }
      },
    });
  }

  openCreateOrder() {
    let dialogRef = this.dialog.open(CreateOrderComponent, {
      width: '50%',
      disableClose: true,
      id: 'create-order-dialog',
    });

    dialogRef.afterClosed().subscribe({
      next: (value: any) => {
        console.log('AfterClose', value);
        if (value) {
          this.dialog.open(OrderStatusComponent, {
            width: '600px',
            data: value,
          });
        }
      },
    });
  }

  openUpdateInventory() {
    let dialogRef = this.dialog.open(UpdateInventoryComponent, {
      width: '30%',
      disableClose: true,
      id: 'update-inventory-dialog',
      data: {},
    });
  }

  openSidePanel(productId: string) {
    this.sidebarService.setSidePanelState({
      component: new ComponentType(UpdateStockComponent, null),
      isSidePanOpened: true,
      data: { productId },
      title: 'Update Inventory',
    });
  }

  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProducts = data;
      return;
    }

    this.sortedProducts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);

        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
