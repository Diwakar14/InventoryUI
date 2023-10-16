import { Component, OnInit } from '@angular/core';
import { SidePanelService } from 'src/app/components/side-panel/side-panel.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss'],
})
export class UpdateStockComponent implements OnInit {
  inventoryDetails: any;
  catalogs: any[] = [];
  batches: any[] = [];
  products: any[] = [];
  vendors: any[] = [];
  prices: any[] = [];
  stocks: any[] = [];

  constructor(
    private stockService: InventoryService,
    private readonly sidePanelService: SidePanelService
  ) {}
  ngOnInit(): void {
    let { productId } = this.sidePanelService.sidePanelData?.data;
    this.getStockByProduct(productId);
  }

  getStockByProduct(productId: number) {
    this.stockService.get(productId).subscribe({
      next: (value: any) => {
        console.log(value);
        this.inventoryDetails = value.data;
        this.vendors = value.data?.vendors;
        this.batches = this.vendors[0].batches;
        this.catalogs = this.batches[0].catalogs;
        this.products = this.catalogs[0].products;
        this.prices = value.data.prices;
        this.stocks = value.data.stocks;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleVendorChange(event: any) {
    let index = event.value;
    this.batches = this.vendors[index].batches;
  }

  handleBatchChange(batch: any) {
    this.catalogs = batch.catalogs;
  }
}
