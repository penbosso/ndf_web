import { AvailableStockComponent } from './../../../shared/available-stock/available-stock.component';
import { Stock } from './../stock/stock';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.css']
})
export class VendorHomeComponent implements OnInit {
  pendingStocks: Stock[] = [];
  errorMessage: any;

  @ViewChild(AvailableStockComponent, {static: true}) availableStock: AvailableStockComponent;

  constructor() { }

  ngOnInit() {}

}
