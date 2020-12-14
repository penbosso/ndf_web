import Fuse from 'fuse.js';
import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.css']
})
export class BlockUserComponent implements OnInit {
  _filter
  pageOfItems: Array<any>;
  errorMessage: any;
  message: string;

  resetErrorMessage(id) {
    id == 1? this.errorMessage = '': this.message = '';
  }

  users: User[];
  filteredUsers: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      result => {
        this.users = result.data;
        this.filteredUsers = this.users;
      }
    );
  }

  get filter() {
    return this._filter;
  }
  set filter(value: string) {
    this._filter = value;
    this.filteredUsers = this.filter ? this.performFilter():this.users;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  activateUser(userId: string) {
    this.userService.suspendActivateUser(true, userId).subscribe(
      _ => {
        this.message = `User activated`
        this.filteredUsers = this.filteredUsers.map(user => {
          (user.id == userId) ? user.isActive = true: '';
          return user;
        })
      },
      error => this.errorMessage = 'An error occurred on the server, this will be resolved soon'
    );
    // to be removed when backend is fixed
    this.filteredUsers = this.filteredUsers.map(user => {
      (user.id == userId) ? user.isActive = true: '';
      return user;
    })
  }
  suspendUser(userId: string) {
    this.userService.suspendActivateUser(false, userId).subscribe(
      _ => {
        this.message = `User suspended`
        this.filteredUsers = this.filteredUsers.map(user => {
          (user.id == userId) ? user.isActive = false: '';
          return user;
        })
      },
      error => this.errorMessage = 'An error occurred on the server, this will be resolved soon'
    );
    this.filteredUsers = this.filteredUsers.map(user => {
      (user.id == userId) ? user.isActive = false: '';
      return user;
    })
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      result => {
        this.message = `User deleted`
        this.filteredUsers = this.filteredUsers.filter(user => user.id != userId);
      },
      error => this.errorMessage = 'An error occurred on the server, this will be resolved soon'
    );
  }


  performFilter(): any {
    const options = {
      keys: [
        "firstName",
        "otherNames",
        "type",
        "companyCode",
        "telephone"
      ],
      threshold: 0.3
    };

    let fuse = new Fuse(this.users, options);

    return fuse.search(this.filter).map(fuse => fuse.item);
  }
}
