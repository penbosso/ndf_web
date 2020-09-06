import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignedupVendorsComponent } from './view-signedup-vendors.component';

describe('ViewSignedupVendorsComponent', () => {
  let component: ViewSignedupVendorsComponent;
  let fixture: ComponentFixture<ViewSignedupVendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSignedupVendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSignedupVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
