import { TestBed } from '@angular/core/testing';

import { AdminVendorService } from './admin-vendor.service';

describe('AdminVendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminVendorService = TestBed.get(AdminVendorService);
    expect(service).toBeTruthy();
  });
});
