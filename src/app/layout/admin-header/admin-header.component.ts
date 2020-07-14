import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHeaderComponent implements OnInit {
  imageBaseUrl = environment.baseImageUrl;

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
