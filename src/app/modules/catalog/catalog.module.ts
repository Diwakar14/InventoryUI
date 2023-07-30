import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../shared.module';
import { CatalogCardComponent } from './components/catalog-card/catalog-card.component';
import { AddCatalogComponent } from './components/add-catalog/add-catalog.component';

@NgModule({
  declarations: [CatalogComponent, CatalogCardComponent, AddCatalogComponent],
  imports: [CommonModule, CatalogRoutingModule, SharedModule],
  exports: [SharedModule],
})
export class CatalogModule {}
