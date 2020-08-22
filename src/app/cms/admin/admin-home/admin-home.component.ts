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
  statusComment: string = ""

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.showOverlay = true;
    this.stockService.getPendingStocks().subscribe(
      stockPage => {
        this.pendingStocks = stockPage.data;
        this.showOverlay = false;
      },
      error => this.errorMessage = "An error occurred please try again later"
    );
  }

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }

  getFilteredStock(id: string) {
    this.filteredStock = this.pendingStocks.find(stock => stock.id === id);
  }

  // getStock(id: string):Stock {
  //   return this.pendingStocks.find(stock => stock.id === id);
  // }

  approveStock(id: string) {
    const approvedStock = {"id": id, "status": "approved", "statusComment": ""}
    // console.log("after", approvedStock);
    this.showOverlay = true;
    this.stockService.approveStock(approvedStock).subscribe(
      () => {
        this.pendingStocks = this.pendingStocks.filter(stock => stock.id !== id)
        this.message = "Stock Approved";
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
    if(this.statusComment.length > 3) {
      const declinedStock = {"id": id, "status": "declined", "statusComment": this.statusComment}
      this.showOverlay = true;
      this.stockService.updateStock(declinedStock).subscribe(
        () => {
          this.pendingStocks = this.pendingStocks.filter(stock => stock.id !== id)
          this.message = "Stock declined";
          this.onSaveComplete()
        },
        (error: any) => {
          this.errorMessage = "An error occurred please try again later";
          this.showOverlay = false;
        }
      );
    } else {
      this.errorMessage = "Enter reason for declining pending stock";
    }
  }

  onSaveComplete(): void {
    this.showOverlay = false;
  }
}
