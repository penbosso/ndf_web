import { Subscription } from 'rxjs';
import { StockService } from './../stock.service';
import { Stock } from './../stock';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
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
  updateThisStockBool: boolean = false;
  private subscription: Subscription;
  imageBaseUrl = environment.baseImageUrl;

  constructor(private stockService : StockService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.stockForm = this.fb.group({
      name:'',
      size:'',
      companyCode:'',
      quantity: new FormControl(1, [Validators.min(1)]),
      pricePerLog: new FormControl(1, [Validators.min(1)]),
      description:'',
      licenseType: '',
    },{validator: [priceCheck, quantityCheck]});

    this.subscription = this.route.paramMap.subscribe( params => {
      const id = params.get('id');
      if (id) {
        this.updateThisStockBool = true;
        this.stockService.getStockById(id).subscribe(
          stock => {console.log(stock);
            this.updateThisStock = stock
            this.updateThisStockBool = false;
            this.stockForm = this.fb.group({
              name: this.updateThisStock.name,
              size: this.updateThisStock.size,
              companyCode: this.updateThisStock.companyCode,
              quantity: this.updateThisStock.quantity,
              pricePerLog: this.updateThisStock.pricePerLog,
              licenseType: this.updateThisStock.licenseType,
              description: this.updateThisStock.description
            });
          },
          error => {
            this.errorMessage = `Error: ${error}`
            this.showOverlay = false;
        }
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
        () => {
          this.message = "Stock successfully updated, Admin will have to approve it before its available for buyers";
          this.onSaveComplete();
          this.router.navigate(['/vendor'], { queryParams: {msg:'success' }});
        },
        (error: any) => {
          this.errorMessage = `Error: ${error}`;
          this.showOverlay = false;
        }
      );
    } else {
      this.stockService.saveStock(newStock).subscribe(
        () => {
          this.message = "New stock successfully created, Admin will have to approve it before its available for buyers";
          this.stockForm.reset();
          this.onSaveComplete();
        },
        (error: any) => {
          this.errorMessage = `Error: ${error}`;
          this.showOverlay = false;
        }
      );
    }
  }

  onSaveComplete(): void {
    this.showOverlay = false;
    // this.message = "New stock successfully created, Admin will have to approve it before its available for buyers";
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
