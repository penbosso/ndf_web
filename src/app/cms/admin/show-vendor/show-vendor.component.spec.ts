import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVendorComponent } from './show-vendor.component';

describe('ShowVendorComponent', () => {
  let component: ShowVendorComponent;
  let fixture: ComponentFixture<ShowVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
