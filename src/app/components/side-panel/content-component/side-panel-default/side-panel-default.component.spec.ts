import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelDefaultComponent } from './side-panel-default.component';

describe('SidePanelDefaultComponent', () => {
  let component: SidePanelDefaultComponent;
  let fixture: ComponentFixture<SidePanelDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePanelDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
