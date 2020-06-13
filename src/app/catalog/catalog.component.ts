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
  _locationFilter: string ="";
  _nameFilter: string = "";
  _unitFilter: string = "";
  uniqueName: string[] = [];
  uniqueLoc: string[] = [];
  uniqueUnit: string[] = [];
  pageOfItems: Array<any>;

  get locationFilter(): string {
    return this._locationFilter;
  }
  set locationFilter(value: string) {
    this._locationFilter = value;
    this.filteredStocks = this.locationFilter ? this.performFilter() : this.stocks;
  }

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
        this.stocks.forEach(stock => {
          if(!(this.uniqueName.includes(stock.name.toLocaleLowerCase()))) {
            this.uniqueName.push(stock.name.toLocaleLowerCase());
          }
          if(!this.uniqueUnit.includes(stock.size.toLocaleLowerCase())) {
            this.uniqueUnit.push(stock.size.toLocaleLowerCase());
          }
          if(!this.uniqueLoc.includes(stock.location.toLocaleLowerCase())) {
            this.uniqueLoc.push(stock.location.toLocaleLowerCase());
          }
        })
      },
    );
  }

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
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
        "size",
        "location"
      ]
    };

    let fuse  = new Fuse(this.stocks, options);
    let para
    if(this._nameFilter.length > 1 && this._unitFilter.length > 1 && this._locationFilter.length > 1) {
      para = {
        $and: [{ name: this._nameFilter }, { size: this._unitFilter }, { location: this._locationFilter }]
      };
    } else if (this._nameFilter.length <= 1 && this._unitFilter.length <= 1 && this._locationFilter.length <= 1) {
      return this.stocks;
    } else if(this._nameFilter.length > 1 && this._unitFilter.length > 1 && this._locationFilter.length <= 1) {
      para = {
        $and: [{ name: this._nameFilter }, { size: this._unitFilter }]
      };
    } else if(this._nameFilter.length > 1 && this._unitFilter.length <= 1 && this._locationFilter.length > 1) {
      para = {
        $and: [{ name: this._nameFilter }, { location: this._locationFilter }]
      };
    } else if(this._nameFilter.length <= 1 && this._unitFilter.length > 1 && this._locationFilter.length > 1) {
      para = {
        $and: [{ size: this._unitFilter }, { location: this._locationFilter }]
      };
    } else if(this._nameFilter.length > 1 && this._unitFilter.length <= 1 && this._locationFilter.length <= 1) {
      para = {
        name: this._nameFilter
      };
    } else if(this._nameFilter.length <= 1 && this._unitFilter.length <= 1 && this._locationFilter.length > 1) {
      para = {
         location: this._locationFilter
      };
    } else {
      para = {
         size: this._unitFilter
      };
    }

    return fuse.search(para).map(fuse => fuse.item);
  }
}
