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

  constructor(
    private router: Router,
    public auth:AuthService) { }

  ngOnInit() {
  }



  authenticate(loginForm: NgForm): void {
    const {telephone, password} = loginForm.value;
    if (telephone && password) {
      this.auth.login(telephone,password)
          .subscribe( success => {
            if (success) {
              this.router.navigateByUrl(this.router.url);
            }
          });
        }
    console.log(telephone, password);
    console.log(JSON.stringify(loginForm.value))
  }

}
