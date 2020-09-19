import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/cms/vendor/stock/stock';
import { environment } from 'src/environments/environment';
import { StockService } from 'src/app/cms/vendor/stock/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-declinded-stock',
  templateUrl: './declinded-stock.component.html',
  styleUrls: ['./declinded-stock.component.css']
})
export class DeclindedStockComponent implements OnInit {

  popoverTitle = 'Confirm delete';
  popoverMessage = 'Are you sure you want to delete this stock ?';
  confirmClicked = false;
  cancelClicked = false;

  pendingStocks: Stock[] = [];
  filteredStock: Stock;
  errorMessage: any;
  pageOfItems: Array<any>;
  imageBaseUrl = environment.baseImageUrl;
  declinedStockCount: number;
  deletedStock = false;
  showLoading: boolean;

  constructor(private stockService : StockService,
              private router: Router) { }

  ngOnInit() {
    this.showLoading = true;
    this.stockService.getVendorsDeclinedStocks().subscribe(
      stockPage => {
        this.pendingStocks = stockPage.data;
        this.showLoading = false;
        this.declinedStockCount = this.pendingStocks.length;
      },
      error => {
        this.errorMessage = `Error: ${error}`
        this.showLoading = false;
    }
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
    this.filteredStock = this.pendingStocks.find(stock => stock.id === id);
  }



  deleteStock(id: string) {
    //deleting stock
    this.stockService.deleteStock(id).subscribe(
      () => {
        this.deletedStock = true;
        this.pendingStocks = this.pendingStocks.filter(stock => stock.id !== id)
      }
    );
  }

  updateStock(id: string) {
    //navigate to update stock page
    this.router.navigate(['vendor/add-stock',id])
  }



}
