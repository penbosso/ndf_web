import { FeedbackService } from './feedback.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Feedback } from './feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedBackForm : FormGroup;
  feedBack = new Feedback();
  showLoading: boolean = false;
  message: string ="";
  errorMessage: any;

  constructor(public auth:AuthService,
              private feedbackService: FeedbackService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.feedBackForm = this.fb.group({
      user: this.auth.getLoggedUser()? `${ this.auth.getLoggedUser().firstName +' ' + this.auth.getLoggedUser().otherName  +' - ' + this.auth.getLoggedUser().telephone }`: '',
      message:'',
      subject:''
    })
  }

  save() {
    const newFeedback = {...this.feedBack, ... this.feedBackForm.value};

    if(newFeedback.subject ===''){
      this.errorMessage = 'Enter subject';
    } else if (newFeedback.message ==='') {
      this.errorMessage = 'Enter message';
    } else {
      this.showLoading = true;
      this.feedbackService.saveFeedBack(newFeedback).subscribe(
        () => {
          this.message='Feedback message sent';
          this.showLoading = false;
      },
        () => {
          this.errorMessage = "An error occurred please try again later";
          this.showLoading = false;
        }
      )
    }
  }
}
