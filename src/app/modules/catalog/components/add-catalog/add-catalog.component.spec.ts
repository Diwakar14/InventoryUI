import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatalogComponent } from './add-catalog.component';

describe('AddCatalogComponent', () => {
  let component: AddCatalogComponent;
  let fixture: ComponentFixture<AddCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCatalogComponent]
    });
    fixture = TestBed.createComponent(AddCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
