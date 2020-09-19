import { FeedbackService } from './../../../feedback/feedback.service';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/feedback/feedback';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  showLoading: boolean = false;
  feedbacks : Feedback[];
  errorMessage: string;
  pageOfItems: Array<any>;
  pageSize = 6;
  showOverlay: boolean = false;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.showLoading = true;
    this.feedbackService.getFeedbacks().subscribe(
      feedbacks => {
        this.feedbacks = feedbacks;
        // console.log(feedbacks)
        this.showLoading = false;
      },
      error => {
        this.errorMessage = `Error: ${error}`
        this.showOverlay = false;
    }
    );
  }

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }

}
