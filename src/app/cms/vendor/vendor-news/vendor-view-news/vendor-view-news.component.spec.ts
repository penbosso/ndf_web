import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorViewNewsComponent } from './vendor-view-news.component';

describe('VendorViewNewsComponent', () => {
  let component: VendorViewNewsComponent;
  let fixture: ComponentFixture<VendorViewNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorViewNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorViewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
