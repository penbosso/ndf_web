import { VendorInfo } from './vendorInfo';

export class VendorPage {
  constructor(
    public pageNumber?: Number,
    public pageSize?: Number,
    public totalNumber?: Number,
    public data?: VendorInfo[]
      ) {}
}
