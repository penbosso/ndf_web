import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ILog } from './log';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {
  logs: ILog[] = []
  pageOfItems: Array<any>;
  errorMessage: any;
  message: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllActivityies().subscribe(
      result => this.logs = result.data,
      error => this.errorMessage = error
    );
  }


  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
