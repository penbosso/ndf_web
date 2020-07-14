import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHeaderComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
