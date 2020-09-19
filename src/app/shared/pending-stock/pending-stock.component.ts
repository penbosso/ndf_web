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

  pendingStocks: Stock[] = [];
  filteredStock: Stock;
  errorMessage: any;
  pageOfItems: Array<any>;
  imageBaseUrl = environment.baseImageUrl;
  pendingStockCount: number;
  deletedStock = false;
  showLoading = false;

  constructor(private stockService : StockService,
              private router: Router) { }

  ngOnInit() {
    this.showLoading = true;
    this.stockService.getVendorsPendingStocks().subscribe(
      stockPage => {
        this.pendingStocks = stockPage.data;
        this.showLoading = false;
        this.pendingStockCount = this.pendingStocks.length;
      },
      error => {
        this.showLoading = false;
        this.errorMessage = `Error: ${error}`
      }
    );
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
