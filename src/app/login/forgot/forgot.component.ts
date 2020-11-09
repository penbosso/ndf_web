import { AuthService } from 'src/app/login/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgortPasswordForm : FormGroup;
  errorMessage: string;
  message: string;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.forgortPasswordForm = this.fb.group({
      telephone:['', Validators.required]
    })
  }

  sendPin() {
    this.loading = true;
    this.authService.sendResetPasswordPin(this.forgortPasswordForm.value).subscribe(
      () => {
        this.router.navigate(['/reset-password']);
      },
      (error: any) => {
        this.errorMessage = `Error: ${error}`;
        this.loading = false;
      }
    );
  }
}
