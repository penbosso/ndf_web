import { User } from './../../../user/user';
import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-signedup-vendors',
  templateUrl: './view-signedup-vendors.component.html',
  styleUrls: ['./view-signedup-vendors.component.css']
})
export class ViewSignedupVendorsComponent implements OnInit {


  errorMessage: any;
  pageOfItems: Array<any>;
  showOverlay: boolean= false;
  vendors: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.showOverlay = true;
    this.userService.getSignedUpVendors().subscribe(
      vendorPag => {
        this.vendors = vendorPag.data;
        this.showOverlay = false;
        console.log(this.vendors);
      }
    );
  }


  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

}
