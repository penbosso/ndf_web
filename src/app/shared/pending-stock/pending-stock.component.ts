import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/cms/vendor/stock/stock';
import { environment } from 'src/environments/environment';
import { StockService } from 'src/app/cms/vendor/stock/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-stock',
  templateUrl: './pending-stock.component.html',
  styleUrls: ['./pending-stock.component.css']
})
export class PendingStockComponent implements OnInit {

  popoverTitle = 'Confirm delete';
  popoverMessage = 'Are you sure you want to delete this stock ?';
  confirmClicked = false;
  cancelClicked = false;

  stocks: Stock[] = [];
  pendingStocks: Stock[] = [];
  filteredStock: Stock;
  errorMessage: any;
  pageOfItems: Array<any>;
  imageBaseUrl = environment.baseImageUrl;
  pendingStockCount: number;
  deletedStock = false;

  constructor(private stockService : StockService,
              private router: Router) { }

  ngOnInit() {
    this.stockService.getVendorsPendingStocks().subscribe(
      stockPage => {
        this.stocks = stockPage.data;
        this.pendingStockCount = this.stocks.length;
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



  deleteStock(id: string) {
    //deleting stock
    this.stockService.deleteStock(id).subscribe(
      () => {
        this.deletedStock = true;
        this.stocks = this.stocks.filter(stock => stock.id !== id)
      }
    );
  }

  updateStock(id: string) {
    //navigate to update stock page
    this.router.navigate(['vendor/add-stock',id])
  }


}
