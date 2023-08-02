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
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FileSelectorComponent } from '../components/file-selector/file-selector.component';

const MAT_MODULE = [
  MatButtonModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatRippleModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    SearchBoxComponent,
    TruncatePipe,
    QtySelectorComponent,
    LoaderComponent,
    FileSelectorComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ...MAT_MODULE],
  exports: [
    SearchBoxComponent,
    CommonModule,
    TruncatePipe,
    QtySelectorComponent,
    LoaderComponent,
    FileSelectorComponent,
    ReactiveFormsModule,
    ...MAT_MODULE,
  ],
  providers: [],
})
export class SharedModule {}
