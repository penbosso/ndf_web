import { Buyer } from './../../user/buyer';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

function confirmPassword(c: AbstractControl): {[key: string]: boolean } | null {
  let confirmControl = c.get('confirmPassword');
  let passwordControl = c.get('password');

  if (confirmControl.pristine || passwordControl.pristine) {
    return null;
  }

  if (passwordControl.value !== confirmControl.value) {
    return { 'match': true};
  }
  return null;
}

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SiteHeaderComponent implements OnInit {
  buyerForm: FormGroup;
  buyer = new Buyer();
  errorMessage: any;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.buyerForm = this.fb.group({
      FirstName: '',
      OtherNames: '',
      Telephone:'',
      Password: '',
      passwordGroup: this.fb.group({
        password:'',
        confirmPassword: ''
      }, {validator: confirmPassword})
    });
  }

  authenticate(loginForm: NgForm): void {
    const {Telephone, Password} = loginForm.value;
    console.log(Telephone, Password);
    console.log(JSON.stringify(loginForm.value))
  }

  saveBuyer(): void {
    const newBuyer = {...this.buyer, ...this.buyerForm.value}
    newBuyer.Password = this.buyerForm.value.passwordGroup.password;

    this.userService.createUser(newBuyer).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
    );
    console.log('new user',newBuyer);
    console.log('Saved: ' + JSON.stringify(this.buyerForm.value));
  }

  onSaveComplete(): void {
    this.buyerForm.reset();
    this.router.navigate([this.router.url]);
  }

}
