import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/cms/vendor/stock/stock';
import { environment } from 'src/environments/environment';
import { StockService } from 'src/app/cms/vendor/stock/stock.service';

@Component({
  selector: 'app-available-stock',
  templateUrl: './available-stock.component.html',
  styleUrls: ['./available-stock.component.css']
})
export class AvailableStockComponent implements OnInit {
  stocks: Stock[] = [];
  pendingStocks: Stock[] = [];
  filteredStock: Stock;
  errorMessage: any;
  imageBaseUrl = environment.baseImageUrl;
  stockCount: number;

  constructor(private stockService : StockService,
              private router: Router) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe(
      stockPage => {
        this.stocks = stockPage.data;
        this.stockCount = this.stocks.length;
      },
      error => this.errorMessage = "An error occurred please try again later"
    );
    // cleaar error after 5s
    if(this.errorMessage) {
      setTimeout(()=>this.errorMessage = '', 5000)
    }
  }

  getFilteredStock(id: string) {
    this.filteredStock = this.stocks.find(stock => stock.id === id);
  }


  deleteStock(id: string) {
    //deleting stock
    this.stockService.deleteStock(id).subscribe(
      () => this.stocks = this.stocks.filter(stock => stock.id !== id)
    );
  }

  updateStock(id: string) {
    //navigate to update stock page
    this.router.navigate(['vendor/add-stock',id])
  }

}
