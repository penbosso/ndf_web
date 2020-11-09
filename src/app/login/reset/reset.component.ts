import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetPasswordForm : FormGroup;
  errorMessage: string;
  message: string;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      pin :['', Validators.required],
      telephone :['', Validators.required],
      password: '',
      passwordGroup: this.fb.group({
        password:['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {validator: confirmPassword})
    });
  }

  resetPassword() {
    this.resetPasswordForm.value.password = this.resetPasswordForm.value.passwordGroup.password;
    this.loading = true;
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.errorMessage = `Error: ${error}`;
        this.loading = false;
      }
      );
  }

}
