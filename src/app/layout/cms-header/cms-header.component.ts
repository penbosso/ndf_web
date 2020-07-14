import { Router } from '@angular/router';
import { AuthService } from './../../login/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CmsHeaderComponent implements OnInit {

  show:boolean = true;
  firstClick: boolean = true;
  toggleShow() {
    if(this.firstClick) { this.firstClick = false; return}
    this.show = this.show? false : true;
  }

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
