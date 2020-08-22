import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclindedStockComponent } from './declinded-stock.component';

describe('DeclindedStockComponent', () => {
  let component: DeclindedStockComponent;
  let fixture: ComponentFixture<DeclindedStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclindedStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclindedStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
