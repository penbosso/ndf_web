import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingStockComponent } from './pending-stock.component';

describe('PendingStockComponent', () => {
  let component: PendingStockComponent;
  let fixture: ComponentFixture<PendingStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
