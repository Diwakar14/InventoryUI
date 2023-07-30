import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from 'src/app/services/catalog.service';
import { env } from 'src/env/env';
import { AddCatalogComponent } from './components/add-catalog/add-catalog.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  catalogs: any[] = [];

  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getCatalog();
  }

  getCatalog() {
    this.catalogService.getCatalogs().subscribe({
      next: (value: any) => {
        this.catalogs = value.data.map((i: any) => ({
          ...i,
          icon: env.resourceUrl + i.icon.split('\\').join('/'),
        }));
      },
    });
  }

  openCatalogAdd() {
    this.dialog.open(AddCatalogComponent, {
      width: '400px',
    });
  }
}
