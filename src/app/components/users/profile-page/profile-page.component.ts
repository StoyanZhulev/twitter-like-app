import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app-state';
import { selectAuth } from '../../../store/reducers/index';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserEditComponent } from '../../user/user-edit/user-edit.component';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @ViewChild(UserEditComponent) userEditModal: UserEditComponent

  private loggedInUser;
  public user;
  public myProfile: boolean = false;
  public posts = {};
  private userUID: string

  public followers = {}
  public following = {}
  constructor(
    private store: Store<AppState>,
    private routerSnap: ActivatedRoute,
    private firebaseDatabase: AngularFireDatabase,
    private angularFire: AngularFirestore,
  ) {
    this.store.select(selectAuth).subscribe(data => {
      this.loggedInUser = data
    })
  }

  ngOnInit() {
    let id = this.routerSnap.snapshot.params.id;
    this.userUID = id;
    if (id === this.loggedInUser.uid) {
      this.user = this.loggedInUser
      this.myProfile = true;
    } else {
      this.myProfile = false;
    }

    this.firebaseDatabase.object(`/users/${id}`).valueChanges().subscribe(data => {
      this.user = data
      this.firebaseDatabase.database.ref('/posts').orderByChild('authorId').equalTo(this.userUID).on('value', sn => {
        this.posts = sn.val();
      })


      this.firebaseDatabase.database.ref(`/users/${id}/followers`).on('value', snapshot => {
        let followers = snapshot.val();
        if(followers){
          this.followers = followers
        }
      })

      this.firebaseDatabase.database.ref(`/users/${id}/following`).on('value', snapshot => {
        if(snapshot.val()){
          this.following = snapshot.val()
        }
      })
    });


  }

  getPosts() {
    if (this.posts) {
      let posts = Object.keys(this.posts).map(k => k = { id: k, ...this.posts[k] })
      return posts ? posts : []
    }
  }

  getFollowers() {
    if(this.followers){
      let followers = Object.keys(this.followers).map(k => k = {uid: k, ...this.followers[k]})
      return followers
    }
  }

  getFollowedUsers() {
    if(this.following){
      let following = Object.keys(this.following).map(k => k = {uid: k, ...this.following[k]})
      return following
    }
  }

}
