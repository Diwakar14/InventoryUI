import { NgModule } from '@angular/core';
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TruncatePipe } from '../pipe/truncate.pipe';
import { QtySelectorComponent } from '../components/qty-selector/qty-selector.component';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from '../components/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const MAT_MODULE = [
  MatButtonModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  declarations: [
    SearchBoxComponent,
    TruncatePipe,
    QtySelectorComponent,
    LoaderComponent,
  ],
  imports: [...MAT_MODULE, CommonModule, ReactiveFormsModule],
  exports: [
    ...MAT_MODULE,
    SearchBoxComponent,
    CommonModule,
    TruncatePipe,
    QtySelectorComponent,
    LoaderComponent,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class SharedModule {}
