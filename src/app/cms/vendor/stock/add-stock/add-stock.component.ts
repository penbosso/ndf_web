import { Subscription } from 'rxjs';
import { StockService } from './../stock.service';
import { Stock } from './../stock';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

function priceCheck(c: AbstractControl): {[key: string]: boolean } | null {
  let priceControl = c.get('pricePerLog');
  if (priceControl.pristine) {
    return null
  }
  if(priceControl.value < 0) {
    return {'match': true};
  }
}

function quantityCheck(c: AbstractControl): {[key: string]: boolean } | null {
  let quantityControl = c.get('quantity');
  if (quantityControl.pristine) {
    return null
  }
  if(quantityControl.value < 1) {
    return {'match': true};
  }
}

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit, OnDestroy {
  public showOverlay = false;
  stockForm : FormGroup;
  message: string ="";
  errorMessage: any;
  stock = new Stock();
  base64Image: string;
  updateThisStock: Stock;
  private subscription: Subscription;
  imageBaseUrl = environment.baseImageUrl;

  constructor(private stockService : StockService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.stockForm = this.fb.group({
      name:'',
      size:'',
      quantity: '',
      pricePerLog: '',
      description:''
    });

    this.subscription = this.route.paramMap.subscribe( params => {
      const id = params.get('id');
      if (id) {
        this.stockService.getStockById(id).subscribe(
          stock => {
            this.updateThisStock = stock
            this.stockForm = this.fb.group({
              name: this.updateThisStock.name,
              size: this.updateThisStock.size,
              quantity: this.updateThisStock.quantity,
              pricePerLog: this.updateThisStock.pricePerLog,
              description: this.updateThisStock.description
            });
          },
          error => this.errorMessage = "An error occurred please try again later"
        );
      }

    });
    // cleaar error after 5s
    if(this.errorMessage) {
      setTimeout(()=>this.errorMessage = '', 5000)
    }
  }

  save() {
    const newStock = {...this.stock, ...this.stockForm.value};
    newStock.image= this.base64Image ? this.base64Image.replace(/^data:image\/[a-z]+;base64,/, "") : this.updateThisStock.image;
    console.log(newStock);
    this.showOverlay = true;
    // update or safe ? up date if id is found
    if (this.updateThisStock) {
      newStock.id = this.updateThisStock.id;
      this.stockService.updateStock(newStock).subscribe(
        () => this.onSaveComplete(),
        (error: any) => {
          this.errorMessage = "An error occurred please try again later";
          this.showOverlay = false;
        }
      );
    } else {
      this.stockService.saveStock(newStock).subscribe(
        () => this.onSaveComplete(),
        (error: any) => {
          this.errorMessage = "An error occurred please try again later";
          this.showOverlay = false;
        }
      );
    }
  }

  onSaveComplete(): void {
    this.stockForm.reset();
    this.showOverlay = false;
    this.message = "Stock added";
  }

  fileChangeEvent(fileInput: any) {
    this.errorMessage = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 2048000;
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

      if (fileInput.target.files[0].size > max_size) {
        this.errorMessage =
          'Maximum size allowed is ' + max_size / 1024000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.errorMessage = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.base64Image = imgBase64Path;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
