import { StockService } from './../stock/stock.service';
import { Stock } from './../stock/stock';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.css']
})
export class VendorHomeComponent implements OnInit {
  stocks: Stock[] = [];
  pendingStocks: Stock[] = [];
  filteredStock: Stock;
  errorMessage: any;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe(
      stockPage => {
        this.stocks = stockPage.data;
      },
      error => this.errorMessage = <any> error
    );
  }

  getFilteredStock(id: string) {
    this.filteredStock = this.stocks.find(stock => stock.id === id);
  }


  deleteStock(id: string) {
    //deleting stock
  }

  updateStock(id: string) {
    //updating stock
  }

}
