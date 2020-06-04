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
  public showOverlay = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              public auth:AuthService) { }

  ngOnInit() {
    this.vendorForm = this.fb.group({
      FirstName: '',
      otherNames: '',
      telephone:'',
      companyCode:'',
      password: '',
      passwordGroup: this.fb.group({
        password:'',
        confirmPassword: ''
      }, {validator: confirmPassword})
    });
    // cleaar error after 5s
    if(this.errorMessage) {
      setTimeout(()=>this.errorMessage = '', 5000)
    }
  }

  saveVendor(): void {
    const newVendor = {...this.vendor, ...this.vendorForm.value}
    newVendor.password = this.vendorForm.value.passwordGroup.password;
    this.showOverlay = true;

    this.userService.createUser(newVendor).subscribe(
      () => this.onSaveComplete(),
      (error: any) =>  {
        this.errorMessage = "An error occurred please try again try again later";
        this.showOverlay = false;
      }
    );
  }

  onSaveComplete(): void {
    this.vendorForm.reset();
    this.showOverlay = false;
    this.router.navigate(['/vendor']);
  }
}
