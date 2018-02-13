import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app-state';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { selectAuth } from '../../store/reducers/index';
import { ViewChild } from '@angular/core';
import { CreateComponent } from '../posts/create/create.component';
import { PostViewModel } from '../../models/post/post-view.model';
import { UpdateFollowedUsers } from '../../store/actions/authentication.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(CreateComponent) createModal: CreateComponent


  public users = [];
  public allUsers = {};
  public followedUsers = {};

  public posts = {};
  public followedUsersPosts = {};

  private userUID: string;
  public user;
  constructor(
    private store: Store<AppState>,
    private firebaseDatabase: AngularFireDatabase,
    private angularAuth: AngularFireAuth,
    private angularFire: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.firebaseDatabase.database.ref('/users').on('child_added', snapshot => {
      if (!this.allUsers.hasOwnProperty(snapshot.key)) {
        let user = {uid: snapshot.key, ...snapshot.val()}
        this.allUsers[snapshot.key] = user;
      }
    })

    this.firebaseDatabase.database.ref('/users').on('child_changed', snapshot => {
      if (this.allUsers.hasOwnProperty(snapshot.key)) {
        let user = {uid: snapshot.key, ...snapshot.val()}        
        if (this.followedUsers.hasOwnProperty(snapshot.key)) {
          this.followedUsers[snapshot.key] = user;
        }
        this.allUsers[snapshot.key] = user;
      }
    })

    this.firebaseDatabase.database.ref('/users').on('child_removed', snapshot => {
      if (this.allUsers.hasOwnProperty(snapshot.key)) {
        delete this.allUsers[snapshot.key]
      }
    })
    this.store.select(selectAuth).subscribe(data => {
      if (data.uid) {
        this.userUID = data.uid;

        // this.firebaseDatabase.database.ref('/posts').on('child_added', snapshot => {
        //   let post = { id: snapshot.key, ...snapshot.val() }
        //   if (!this.posts.hasOwnProperty(snapshot.key)) {
        //     if (this.followedUsers.hasOwnProperty(post.authorId)) {
        //       this.followedUsersPosts[snapshot.key] = post
        //     }
        //     this.posts[snapshot.key] = post
        //   }
        // })
        

        // this.firebaseDatabase.database.ref('/posts').on('child_changed', snapshot => {
        //   let post = { id: snapshot.key, ...snapshot.val() }
        //   if (this.posts.hasOwnProperty(snapshot.key)) {
        //     if (this.followedUsers.hasOwnProperty(post.authorId)) {
        //       this.followedUsersPosts[snapshot.key] = post
        //     }
        //     this.posts[snapshot.key] = post
        //   }
        // })

        // this.firebaseDatabase.database.ref('/posts').on('child_removed', snapshot => {
        //   let post = { id: snapshot.key, ...snapshot.val() }
        //   if (this.posts.hasOwnProperty(snapshot.key)) {
        //     if (this.followedUsers.hasOwnProperty(post.authorId)) {
        //       delete this.followedUsersPosts[snapshot.key];
        //     }
        //     delete this.posts[snapshot.key];
        //   }
        // })

        this.firebaseDatabase.database.ref(`/users/${this.userUID}/following`).on('child_added', snapshot => {
          if (!this.followedUsers.hasOwnProperty(snapshot.key)) {
            if (this.allUsers.hasOwnProperty(snapshot.key))
              this.followedUsers[snapshot.key] = this.allUsers[snapshot.key];
          }
              
          
        })

        this.firebaseDatabase.database.ref(`/users/${this.userUID}/following`).on('child_changed', snapshot => {
          if (this.followedUsers.hasOwnProperty(snapshot.key)) {
            this.followedUsers[snapshot.key] = this.allUsers[snapshot.key];
          }
        })

        this.firebaseDatabase.database.ref(`/users/${this.userUID}/following`).on('child_removed', snapshot => {
          if (this.followedUsers.hasOwnProperty(snapshot.key)) {
            delete this.followedUsers[snapshot.key]
            for(let p in this.followedUsersPosts){
              if(snapshot.key === this.followedUsersPosts[p].authorId){
                delete this.followedUsersPosts[p]
              }
            }
          }
         
        })

        



        this.firebaseDatabase.database.ref('/posts').on('value', snapshot => {
          this.posts = snapshot.val();
          for(let p in this.posts){
            if(this.followedUsers.hasOwnProperty(this.posts[p].authorId)){
              this.followedUsersPosts[p] = this.posts[p]
            }
          }
        })

        

        this.user = data;
      }
    })
  }


  getUsers() {
    if(this.users){
      let users = Object.keys(this.allUsers).map(k => k = this.allUsers[k])
      return users;
    }
  }


  getFollowedUsers() {
    if(this.followedUsers){
      let users = {};
      for (let u in this.followedUsers){
        users[u] = true;
      }
      this.store.dispatch(new UpdateFollowedUsers(users))
      let followedUsers = Object.keys(this.followedUsers).map(k => k = this.followedUsers[k]);
      return followedUsers;
    }
          
  }


  getPosts() {
    if(this.posts){
      let posts = Object.keys(this.posts).map(k => k = {id: k, ...this.posts[k]});
      return posts;
    }
  }

  getFollowedUsersPosts() {
    if(this.followedUsersPosts){
      let posts = Object.keys(this.followedUsersPosts).map(k => k = {id: k, ...this.followedUsersPosts[k]});
      return posts;
    }
    
  }
}
