import { Component, OnInit } from '@angular/core';
import { VendorInfo } from '../vendorInfo';
import { AdminVendorService } from '../admin-vendor.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.css']
})
export class ViewVendorComponent implements OnInit {
  vendor: VendorInfo;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private vendorService: AdminVendorService) { }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe( params => {
      const code = params.get('code');

    this.vendorService.getVendorByCode(code).subscribe(
      (data) => {
        this.vendor = data;
      }
    );
  });
  }

}
