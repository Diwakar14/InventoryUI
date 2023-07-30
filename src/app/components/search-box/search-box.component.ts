import { HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
  tap,
} from 'rxjs';

export interface IDropdownList {
  id: number;
  name: string;
  icon?: string;
}

export interface IInputProps {
  name: string;
  placeholder: string;
  required: boolean;
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements AfterViewInit {
  @Input()
  inputProps: any;

  @Input()
  service: any;

  @Input()
  searchKey: string = '';

  @Input()
  resetOnSelect: boolean = false;

  @Input()
  showDropdownIcon: boolean = false;

  @Output()
  onItemSelected = new EventEmitter();

  @ViewChild('searchInput', { static: false })
  searchInput: any;

  isSearching: boolean = false;
  dropdownList: IDropdownList[] = [];
  searchControl = new FormControl();

  constructor() {}

  ngAfterViewInit(): void {
    this.searchCatalog();
  }

  searchCatalog() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        tap(() => {
          this.isSearching = true;
        }),
        map((val: any) => val.target?.value),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((input) =>
          this.service.search(new HttpParams().set(this.searchKey, input))
        )
      )
      .subscribe({
        next: (value: any) => {
          console.log(value);
          this.isSearching = false;
          this.dropdownList = value.data;
        },
        error: (err) => {
          this.isSearching = false;
        },
      });
  }

  displaySelect(value: any): any {
    if (value) return value.name;
  }

  onItemSelect() {
    this.onItemSelected.emit(this.searchControl.value);

    if (this.resetOnSelect) {
      this.searchControl.reset();
    }
  }
}
