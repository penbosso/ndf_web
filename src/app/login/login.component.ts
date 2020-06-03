import { Vendor } from './../user/vendor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  vendor = new Vendor()
  public showOverlay = false;
  errorMessage: any;

  constructor(
    private router: Router,
    public auth:AuthService) { }

  ngOnInit() {
  }



  authenticate(loginForm: NgForm): void {
    const {telephone, password} = loginForm.value;
    this.showOverlay = true;
    if (telephone && password) {
      this.auth.login(telephone,password)
          .subscribe( success => {
            if (success) {
              this.showOverlay = false;
              this.errorMessage = '';
              this.router.navigateByUrl('/vendor');
            } else {
              this.showOverlay = false;
              this.errorMessage = "Invalid telephone number / password";
          }
          });
        }
    console.log(telephone, password);
    console.log(JSON.stringify(loginForm.value))
  }

}
