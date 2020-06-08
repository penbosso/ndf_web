import { Component, OnInit } from '@angular/core';
import { StockService } from '../cms/vendor/stock/stock.service';
import { environment } from 'src/environments/environment.prod';
import { Stock } from '../cms/vendor/stock/stock';
import { AdminVendorService } from '../cms/admin/admin-vendor.service';
import { VendorInfo } from '../cms/admin/vendorInfo';

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
  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredStocks = this.listFilter ? this.performFilter(this.listFilter) : this.stocks;
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

  performFilter(listFilter: string): Stock[] {
    listFilter = listFilter.toLocaleLowerCase();
    return this.stocks.filter((newsArticle: Stock) =>
      newsArticle.description.toLocaleLowerCase().indexOf(listFilter) !== -1);
  }
}
