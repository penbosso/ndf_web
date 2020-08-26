import { DeclindedStockComponent } from './../../../shared/declinded-stock/declinded-stock.component';
import { AvailableStockComponent } from './../../../shared/available-stock/available-stock.component';
import { Stock } from './../stock/stock';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PendingStockComponent } from 'src/app/shared/pending-stock/pending-stock.component';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.css']
})
export class VendorHomeComponent implements OnInit {
  pendingStocks: Stock[] = [];
  errorMessage: any;

  @ViewChild(AvailableStockComponent, {static: true}) availableStock: AvailableStockComponent;
  @ViewChild(PendingStockComponent, {static: true}) pendingStock: PendingStockComponent;
  @ViewChild(DeclindedStockComponent, {static: true}) declinedStock: DeclindedStockComponent;

  @ViewChild('availableId', {static: true}) public availableId:ElementRef;
  @ViewChild('pendingId', {static: true}) public pendingId:ElementRef;
  @ViewChild('declinedId', {static: true}) public declinedId:ElementRef;

  public availableSection():void {
    this.availableId.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  public pendingSection():void {
    this.pendingId.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  public declineSection():void {
    this.declinedId.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  constructor() { }

  ngOnInit() {}

}
