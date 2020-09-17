export class Stock {
  id: string;
  location: string;
  vendorId: string;
  constructor(
    public name ='',
    public size ='',
    public companyCode = '',
    public quantity = 0,
    public pricePerLog= 0,
    public description ='',
    public statusComment = '',
    public isApproved = false,
    public licenseType = '',
    public image = '') {}
}
