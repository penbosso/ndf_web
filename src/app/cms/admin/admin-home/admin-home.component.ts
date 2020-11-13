import { filter } from 'rxjs/operators';
import { StockService } from './../../vendor/stock/stock.service';
import { Stock } from './../../vendor/stock/stock';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminVendorService } from '../admin-vendor.service';
import { VendorInfo } from '../vendorInfo';
import { UserService } from 'src/app/user/user.service';

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
  vendor: VendorInfo;
  filteredStock: Stock;
  errorMessage: any;
  pageOfItems: Array<any>;
  imageBaseUrl = environment.baseImageUrl;
  pageSize = 6;
  bulkAproval :string[] = [];
  showOverlay: boolean= false;
  message: string;
  statusComment: string = ""
  vendorCount: number;
  buyerCount: number;

  constructor(private stockService: StockService, private vendorService : AdminVendorService, private userService: UserService) { }

  ngOnInit() {
    this.showOverlay = true;
    this.stockService.getPendingStocks().subscribe(
      stockPage => {
        this.pendingStocks = stockPage.data;
        this.showOverlay = false;
      },
      error => {
        this.errorMessage  = `Error: ${error}`
        this.showOverlay = false;
    }
    );

    this.getBuyerVendorCount();
  }

  getBuyerVendorCount() {
    this.userService.getUsers().subscribe(
      result => {console.log(result.data);
        this.vendorCount = result.data.filter(datum => datum.type === 'vendor').length;
        this.buyerCount = result.data.filter(datum => datum.type ==='buyer').length;
      }
    );
  }

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }

  getFilteredStock(id: string) {
    this.filteredStock = this.pendingStocks.find(stock => stock.id === id);
    this.getStockVendor(this.filteredStock.vendorId);console.log("venodr ID", this.filteredStock.vendorId);
  }

  getStockVendor(id: string) {
    return this.vendorService.getVendorByid(id).subscribe(
      vendor => this.vendor = vendor
    );
  }

  // getStock(id: string):Stock {
  //   return this.pendingStocks.find(stock => stock.id === id);
  // }

  approveStock(id: string) {
    const approvedStock = {"id": id, "status": "approved", "statusComment": ""}
    // console.log("after", approvedStock);
    this.showOverlay = true;
    this.stockService.approveOrDeclineStock(approvedStock).subscribe(
      () => {
        this.pendingStocks = this.pendingStocks.filter(stock => stock.id !== id)
        this.message = "Stock Approved";
        this.onSaveComplete()
      },
      (error: any) => {
        this.errorMessage  = `Error: ${error}`;
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
      this.stockService.approveOrDeclineStock(declinedStock).subscribe(
        () => {
          this.pendingStocks = this.pendingStocks.filter(stock => stock.id !== id);
          this.message = "Stock declined";
          this.statusComment = '';
          this.onSaveComplete()
        },
        (error: any) => {
          this.errorMessage  = `Error: ${error}`;
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
