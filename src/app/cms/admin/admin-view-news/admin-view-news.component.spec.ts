import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewNewsComponent } from './admin-view-news.component';

describe('AdminViewNewsComponent', () => {
  let component: AdminViewNewsComponent;
  let fixture: ComponentFixture<AdminViewNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
