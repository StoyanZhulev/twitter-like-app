import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app-state';
import { selectAuth } from '../../../store/reducers/index';
import { UserService } from '../../../services/user.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user;
  public loggedInUser;
  public url: string;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService,
    private toastr: ToastrService,
    private routerSnap: ActivatedRoute,
  ) { 
    this.store.select(selectAuth).subscribe(data => {
      this.loggedInUser = data
    })

    this.url = '/' + routerSnap.snapshot.url.map(e => e.path).reduce((a, b) => a  + '/' + b);
  }

  ngOnInit() {
  }

  openProfile(uid){
    this.router.navigateByUrl('/users/' + uid)
  }

  follow(uid){
    console.log(this.url)
    let following = this.loggedInUser.following ? this.loggedInUser.following : {}

    console.log(following)
    following[uid] = {email: this.user.email, firstName: this.user.firstName, lastName: this.user.lastName, image: this.user.image};

    let user = {
      email: this.loggedInUser.email,
      firstName: this.loggedInUser.firstName,
      lastName: this.loggedInUser.lastName,
      image: this.loggedInUser.image,
      following: following
    }
    this.userService.editUser(user).subscribe(data => {
      this.toastr.showSuccess('Followed user', 'Successfully followed ' + this.user.firstName)
      let followers = this.user.followers ? this.user.followers : {};
      followers[this.loggedInUser.uid] = {email: this.loggedInUser.email, firstName: this.loggedInUser.firstName, lastName: this.loggedInUser.lastName, image: this.loggedInUser.image};
      let followedUser = {
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        image: this.user.image,
        followers: followers
      }
      this.userService.followUser(this.user.uid, followedUser).subscribe(data => {
        console.log(data)
      })
    })
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
    this.userService.editUser(user).subscribe(data => {
      this.toastr.showSuccess('Followed user', 'Successfully unfolled ' + this.user.firstName)
      let followers = this.user.followers ? this.user.followers : {};
      delete followers[this.loggedInUser.uid];
      let followedUser = {
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        image: this.user.image,
        followers: followers
      }
      this.userService.followUser(this.user.uid, followedUser).subscribe(data => {
        console.log(data)
      })
    })
  }
}
