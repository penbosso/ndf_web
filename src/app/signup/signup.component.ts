import { AuthService } from './../login/auth.service';
import { Vendor } from './../user/vendor';
import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';

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
  base64Image: any;
  profilePic = environment.profilePic;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              public auth:AuthService) { }

  ngOnInit() {
    this.vendorForm = this.fb.group({
      FirstName: ['', Validators.required],
      otherNames: ['', Validators.required],
      telephone:['', Validators.required],
      terms:['', Validators.required],
      companyCode: ['', Validators.required],
      password: '',
      passwordGroup: this.fb.group({
        password:['', Validators.required],
        confirmPassword: ['', Validators.required]
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
    newVendor.profilePic = this.base64Image ? this.base64Image.replace(/^data:image\/[a-z]+;base64,/, "") : this.vendor.profilePic;
    this.showOverlay = true;

    this.userService.createUser(newVendor).subscribe(
      () => this.onSaveComplete(),
      (error: any) =>  {
        this.errorMessage = `Error: ${error}`;
        this.showOverlay = false;
      }
    );
  }

  onSaveComplete(): void {
    this.vendorForm.reset();
    this.showOverlay = false;
    this.router.navigate(['/vendor']);
  }

  fileChangeEvent(fileInput: any) {
    this.errorMessage = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 2048000;
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

      if (fileInput.target.files[0].size > max_size) {
        this.errorMessage =
          'Maximum size allowed is ' + max_size / 1024000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.errorMessage = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.base64Image = imgBase64Path;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
