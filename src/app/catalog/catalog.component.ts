import { Component, OnInit } from '@angular/core';
import { StockService } from '../cms/vendor/stock/stock.service';
import { environment } from 'src/environments/environment.prod';
import { Stock } from '../cms/vendor/stock/stock';
import { AdminVendorService } from '../cms/admin/admin-vendor.service';
import { VendorInfo } from '../cms/admin/vendorInfo';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  vendor: VendorInfo;
  stocks: Stock[] = [];
  filteredStocks: Stock[];
  filteredStock: Stock;
  imageBaseUrl = environment.baseImageUrl;
  // _locationFilter: string;
  _nameFilter: string;
  _unitFilter: string;

  // get locationFilter(): string {
  //   return this._locationFilter;
  // }
  // set locationFilter(value: string) {
  //   this._locationFilter = value;
  //   this.filteredStocks = this.locationFilter ? this.performFilter() : this.stocks;
  // }

  get nameFilter(): string {
    return this._nameFilter;
  }
  set nameFilter(value: string) {
    this._nameFilter = value;
    this.filteredStocks = this.nameFilter ? this.performFilter() : this.stocks;
  }

  get unitFilter(): string {
    return this._unitFilter;
  }
  set unitFilter(value: string) {
    this._unitFilter = value;
    this.filteredStocks = this.unitFilter ? this.performFilter() : this.stocks;
  }

  constructor(private stockService : StockService,private vendorService : AdminVendorService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe(
      stockPage => {
        this.stocks = stockPage.data;
        this.filteredStocks = this.stocks;
      },
    );
  }

  getFilteredStock(id: string) {
    this.filteredStock = this.stocks.find(stock => stock.id === id);
    this.getStockVendor(this.filteredStock.vendorId);console.log("venodr ID", this.filteredStock.vendorId);
  }

  getStockVendor(id: string) {
    return this.vendorService.getVendorByid(id).subscribe(
      vendor => this.vendor = vendor
    );
  }

  performFilter(): any {
    const options = {
      keys: [
        "name",
        "unit"
      ]
    };
    
    let fuse  = new Fuse(this.stocks, options);
    const para = {
      $and: [{ name: this._nameFilter }, { unit: this._unitFilter }]
    };
    return fuse.search("param");
  }
}
