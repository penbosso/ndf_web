import { AuthService } from './../../login/auth.service';
import { Buyer } from './../../user/buyer';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
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
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SiteHeaderComponent implements OnInit {
  imageBaseUrl = environment.baseImageUrl;
  buyerForm: FormGroup;
  buyer = new Buyer();
  errorMessage: any;
  public showOverlay = false;
  profilePic = environment.profilePic;
  showBuyerSignUp: boolean = false;

  show:boolean = false;
  toggleShow = () => this.show = !this.show;


  @ViewChild('closeLoginModal', { static: true }) closeLoginModal: ElementRef
  @ViewChild('closeSignupModal', { static: true }) closeSignupModal: ElementRef

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              public auth:AuthService) { }

  ngOnInit() {
    if(this.auth.getLoggedUser()) {
      this.profilePic = this.auth.getLoggedUser().profilePic ?
                          this.imageBaseUrl +'/'+ this.auth.getLoggedUser().profilePic
                        : this.profilePic;
                    }
    this.buyerForm = this.fb.group({
      FirstName: ['', Validators.required],
      otherNames: ['', Validators.required],
      telephone:['', Validators.required],
      terms:['', Validators.required],
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

  authenticate(loginForm: NgForm): void {
    const {telephone, password} = loginForm.value;
    if (telephone && password) {console.log(telephone, password);
      this.showOverlay = true;
      this.auth.login(telephone,password)
          .subscribe( success => {
            if (success) {
              this.showOverlay = false;
              this.errorMessage = '';
              if(this.auth.getLoggedUser().type =='vendor') {
                this.router.navigateByUrl('/vendor');
              }
              if(this.auth.getLoggedUser().type =='admin') {
                this.router.navigateByUrl('/admin');
              }
              this.closeLoginModal.nativeElement.click();
            } else {
              this.showOverlay = false;
              this.errorMessage = "Invalid telephone number or password";
            }
          });
        } else {
          this.errorMessage = "Telephone number / password is required";
        }
  }

  saveBuyer(): void {
    const newBuyer = {...this.buyer, ...this.buyerForm.value}
    newBuyer.password = this.buyerForm.value.passwordGroup.password;

    this.showOverlay = true;
    this.userService.createUser(newBuyer).subscribe(
      () => this.onSaveComplete(),
      (error: any) =>  {
        this.errorMessage  = `Error: ${error}`;
        console.log('error from component');
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
