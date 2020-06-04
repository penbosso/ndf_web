import { AuthService } from './../../login/auth.service';
import { Buyer } from './../../user/buyer';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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
  public showOverlay = false;

  @ViewChild('closeLoginModal', { static: true }) closeLoginModal: ElementRef
  @ViewChild('closeSignupModal', { static: true }) closeSignupModal: ElementRef

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              public auth:AuthService) { }

  ngOnInit() {
    this.buyerForm = this.fb.group({
      FirstName: '',
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

  authenticate(loginForm: NgForm): void {
    this.showOverlay = true;
    const {telephone, password} = loginForm.value;
    if (telephone && password) {
      this.auth.login(telephone,password)
          .subscribe( success => {
            if (success) {
              this.showOverlay = false;
              this.errorMessage = '';
              this.router.navigateByUrl(this.router.url);
              this.closeLoginModal.nativeElement.click();
            } else {
              this.showOverlay = false;
              this.errorMessage = "Invalid telephone number / password";
            }
          });
        }
  }

  saveBuyer(): void {
    const newBuyer = {...this.buyer, ...this.buyerForm.value}
    newBuyer.password = this.buyerForm.value.passwordGroup.password;

    this.showOverlay = true;
    this.userService.createUser(newBuyer).subscribe(
      () => this.onSaveComplete(),
      (error: any) =>  {
        this.errorMessage = "An error occurred please try again try again later";
        this.showOverlay = false;
      }
    );
    console.log('new buyer',newBuyer);
    console.log('Saved: ' + JSON.stringify(this.buyerForm.value));
  }

  onSaveComplete(): void {
    this.buyerForm.reset();
    this.closeSignupModal.nativeElement.click()
    this.router.navigate([this.router.url]);
    this.showOverlay = false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
