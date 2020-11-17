import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.css']
})
export class BlockUserComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(
      result => {
        this.users = result.data
      }
    );
  }

}
