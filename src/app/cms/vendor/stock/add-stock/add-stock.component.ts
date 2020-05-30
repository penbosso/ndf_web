import { StockService } from './../stock.service';
import { Stock } from './../stock';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit,ChangeDetectorRef,AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  public showOverlay = false;
  stockForm : FormGroup;
  message=""
  errorMessage: any;
  stock = new Stock();

  constructor(private stockService : StockService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.stockForm = this.fb.group({
      name:'',
      size:'',
      quantity: '',
      pricePerLog: '',
      description:''
    })
  }

  save() {
    const newStock = {...this.stock, ...this.stockForm.value};console.log(this.stockForm.value);
    this.showOverlay = true;
    this.stockService.saveStock(newStock).subscribe(
      () => this.onSaveComplete(),
      (error: any) => {
        this.errorMessage = <any>error;
        this.showOverlay = false;
      }
    );

  }

  onSaveComplete(): void {
    this.stockForm.reset();
    this.showOverlay = false;
    this.message = "Stock added";
  }

}
