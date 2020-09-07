import { Router } from '@angular/router';
import { AuthService } from './../../login/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CmsHeaderComponent implements OnInit {

  imageBaseUrl = environment.baseImageUrl;

  show:boolean = false;
  toggleShow = () => this.show = !this.show;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
