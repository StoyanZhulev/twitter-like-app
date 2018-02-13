import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app-state';
import { selectAuth } from '../../../store/reducers/index';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user;
  public loggedInUser;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService
  ) { 
    this.store.select(selectAuth).subscribe(data => {
      this.loggedInUser = data
    })
  }

  ngOnInit() {
  }

  openProfile(uid){
    this.router.navigateByUrl('/users/' + uid)
  }

  follow(uid){
    let following = this.loggedInUser.following ? this.loggedInUser.following : {}

    following[uid] = true;

    let user = {
      email: this.loggedInUser.email,
      firstName: this.loggedInUser.firstName,
      lastName: this.loggedInUser.lastName,
      image: this.loggedInUser.image,
      following: following
    }
    this.userService.editUser(user)
  }

  unfollow(uid){
    let following = this.loggedInUser.following ? this.loggedInUser.following : {}

    delete following[uid];

    let user = {
      email: this.loggedInUser.email,
      firstName: this.loggedInUser.firstName,
      lastName: this.loggedInUser.lastName,
      image: this.loggedInUser.image,
      following: following
    }
    this.userService.editUser(user)
  }
}
