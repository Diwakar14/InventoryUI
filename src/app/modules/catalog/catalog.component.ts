import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from 'src/app/services/catalog.service';
import { env } from 'src/env/env';
import { AddCatalogComponent } from './components/add-catalog/add-catalog.component';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, AfterViewInit {
  catalogs: any[] = [];
  loadingCatalogs = false;

  @ViewChild('searchInput', { static: false })
  searchInput: ElementRef<HTMLInputElement>;
  constructor(
    private catalogService: CatalogService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getCatalog();
  }
  ngAfterViewInit(): void {
    this.searchCatalog();
  }

  searchCatalog() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        tap((_) => (this.loadingCatalogs = true)),
        map((v: any) => v.target.value),
        distinctUntilChanged(),
        debounceTime(400),
        switchMap((value) =>
          this.catalogService.search(new HttpParams().set('name', value))
        ),
        catchError((e) => of([]))
      )
      .subscribe({
        next: (value: any) => {
          this.loadingCatalogs = false;
          this.catalogs = value.data.map((i: any) => ({
            ...i,
            icon: env.resourceUrl + i.icon.split('\\').join('/'),
          }));
        },
        error: (err) => {
          this.loadingCatalogs = false;
        },
      });
  }

  getCatalog() {
    this.loadingCatalogs = true;
    this.catalogService.getCatalogs().subscribe({
      next: (value: any) => {
        this.loadingCatalogs = false;
        this.catalogs = value.data.map((i: any) => ({
          ...i,
          icon: env.resourceUrl + i.icon.split('\\').join('/'),
        }));
      },
      error: (err) => {
        this.loadingCatalogs = false;
      },
    });
  }

  openCatalogAdd() {
    this.dialog
      .open(AddCatalogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            this.catalogs.unshift({
              ...value,
              icon: env.resourceUrl + value.icon.split('\\').join('/'),
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
