import { AuthService } from './../login/auth.service';
import { Vendor } from './../user/vendor';
import { Component, OnInit} from '@angular/core';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  vendorForm: FormGroup;
  vendor = new Vendor();
  errorMessage: any;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              public auth:AuthService) { }

  ngOnInit() {
    this.vendorForm = this.fb.group({
      FirstName: '',
      otherNames: '',
      telephone:'',
      registrationCode:'',
      password: '',
      passwordGroup: this.fb.group({
        password:'',
        confirmPassword: ''
      }, {validator: confirmPassword})
    });
  }

  saveVendor(): void {
    const newVendor = {...this.vendor, ...this.vendorForm.value}
    newVendor.password = this.vendorForm.value.passwordGroup.password;

    this.userService.createUser(newVendor).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
    );
    console.log('new vendor',newVendor);
    console.log('Saved: ' + JSON.stringify(this.vendorForm.value));
  }

  onSaveComplete(): void {
    this.vendorForm.reset();
    this.router.navigate([this.router.url]);
  }
}
