import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorService } from 'src/app/services/vendor.service';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { AddBatchComponent } from './components/add-batch/add-batch.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent implements OnInit {
  vendors: any[] = [];
  loadingVendors: boolean = false;
  constructor(
    private vendorService: VendorService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getVendors();
  }

  getVendors() {
    this.loadingVendors = true;
    this.vendorService.getVendors().subscribe({
      next: (value: any) => {
        if (value.status == 200) {
          this.vendors = value.data;
        }

        this.loadingVendors = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingVendors = false;
      },
    });
  }

  openVendorDialog() {
    this.dialog
      .open(AddVendorComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            this.vendors.unshift(value.data);
          }
        },
      });
  }

  openBatchDialog() {
    this.dialog.open(AddBatchComponent, {
      width: '400px',
    });
  }
}
