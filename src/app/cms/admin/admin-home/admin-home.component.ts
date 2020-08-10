import { filter } from 'rxjs/operators';
import { StockService } from './../../vendor/stock/stock.service';
import { Stock } from './../../vendor/stock/stock';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  popoverTitle = 'Confirm Approval';
  popoverMessage = 'Are you sure you want to approve all this stocks ?';
  confirmClicked = false;
  cancelClicked = false;

  pendingStocks: Stock[] = []
  filteredStock: Stock;
  errorMessage: any;
  pageOfItems: Array<any>;
  imageBaseUrl = environment.baseImageUrl;
  pageSize = 6;
  bulkAproval :string[] = [];
  showOverlay: boolean= false;
  message: string;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getPendingStocks().subscribe(
      stockPage => {
        this.pendingStocks = stockPage.data;
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
    this.filteredStock = this.pendingStocks.find(stock => stock.id === id);
  }

  getStock(id: string):Stock {
    return this.pendingStocks.find(stock => stock.id === id);
  }

  approveStock(id: string) {
    const approvedStock = this.getStock(id);
    approvedStock.isApproved = true;
    // console.log("after", approvedStock);
    this.showOverlay = true;
    this.stockService.updateStock(approvedStock).subscribe(
      () => {
        this.pendingStocks = this.pendingStocks.filter(stock => stock.id !== id)
        this.onSaveComplete()
      },
      (error: any) => {
        this.errorMessage = "An error occurred please try again later";
        this.showOverlay = false;
      }
    );
  }

  approveAllStock() {
    for( let stock of this.pendingStocks) {
      this.approveStock(stock.id);
    }
  }


  declineStock(id: string) {
    //deleting stock
    this.stockService.deleteStock(id).subscribe(
      () => {
        this.pendingStocks = this.pendingStocks.filter(stock => stock.id !== id)
      }
    );
  }

  onSaveComplete(): void {
    this.showOverlay = false;
    this.message = "Stock Approved";
  }
}
