
import { VendorInfo } from './../vendorInfo';
import { Component, OnInit } from '@angular/core';
import { AdminVendorService } from '../admin-vendor.service';

@Component({
  selector: 'app-show-vendor',
  templateUrl: './show-vendor.component.html',
  styleUrls: ['./show-vendor.component.css']
})
export class ShowVendorComponent implements OnInit {
  vendors: VendorInfo[] = [];
  errorMessage: any;

  constructor(private VendorService: AdminVendorService) { }

  ngOnInit() {
    this.VendorService.showVendors().subscribe(
      vendorInfoPage => {
        this.vendors = vendorInfoPage.data;
      },
      error => this.errorMessage = "An error occurred please try again try again later"
    );
  }

}
