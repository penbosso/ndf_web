import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/user/user';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';


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
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  adminForm: FormGroup;
  admin = new User();
  errorMessage: any;
  public showOverlay = false;
  base64Image: string;
  message: string;
  profilePic = environment.profilePic;


  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    public auth:AuthService) { }

  ngOnInit() {
    this.adminForm = this.fb.group({
      firstName: '',
      otherNames: '',
      telephone:'',
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

  saveAdmin(): void {
    const newAdmin = {...this.admin, ...this.adminForm.value}
    newAdmin.type = "admin"
    newAdmin.profilePic = this.base64Image ? this.base64Image.replace(/^data:image\/[a-z]+;base64,/, "") : this.admin.profilePic;
    newAdmin.password = this.adminForm.value.passwordGroup.password;
    console.log(newAdmin);
    this.showOverlay = true;
    this.userService.createUser(newAdmin).subscribe(
      () => this.onSaveComplete(),
      (error: any) => {
        this.errorMessage = "An error occurred please try again later";
        this.showOverlay = false;
      }
    )

  }

  onSaveComplete(): void {
    this.adminForm.reset();
    this.showOverlay = false;
    this.message = "Account created"
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
