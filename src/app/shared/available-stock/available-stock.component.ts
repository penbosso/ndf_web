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
  [x: string]: any;
  stocks: Stock[] = [];
  pendingStocks: Stock[] = [];
  filteredStock: Stock;
  errorMessage: any;
  pageOfItems: Array<any>;
  imageBaseUrl = environment.baseImageUrl;
  stockCount: number;

  constructor(private stockService : StockService,
              private router: Router) { }

  ngOnInit() {
    this.stockService.getVendorsStocks().subscribe(
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

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }

  getFilteredStock(id: string) {
    this.filteredStock = this.stocks.find(stock => stock.id === id);
  }



  showDialog(id: string) {
    this.confirmDialogService.confirmThis("Are you sure to delete this stock ?", function () {
      this.deleteStock(id)
    }, function () {
      return
    })
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
