import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/login/auth.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  message: string = "";
  errorMessage: any;
  userForm: FormGroup;
  user = this.auth.getLoggedUser();
  public showOverlay = false;
  base64Image: string;
  imageBaseUrl = environment.baseImageUrl;
  profilePic = this.auth.getLoggedUser().profilePic? `${this.imageBaseUrl}/${this.auth.getLoggedUser().profilePic}`: environment.profilePic;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              public auth:AuthService) { }

  ngOnInit() {console.log("user",this.auth.getLoggedUser())
    this.userForm = this.fb.group({
      firstName: this.user.FirstName,
      otherNames: this.user.otherNames,
      telephone: this.user.telephone
    });
  }

  updateUser() {
    let userUpdate = {...this.user, ...this.userForm.value};
    userUpdate.profilePic = this.base64Image ? this.base64Image.replace(/^data:image\/[a-z]+;base64,/, "") : this.user.profilePic;
    this.showOverlay = true;

    this.userService.updateUser(userUpdate).subscribe(
      () => {
        this.showOverlay = false;
        this.message ="New changes saved";
      },
      (error: any) => {
        this.errorMessage = `Error: ${error}`;
        this.showOverlay = false;
      }
    )
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
