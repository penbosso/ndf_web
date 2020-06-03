import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNewsComponent } from './vendor-news.component';

describe('VendorNewsComponent', () => {
  let component: VendorNewsComponent;
  let fixture: ComponentFixture<VendorNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
