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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(CreateComponent) createModal: CreateComponent


  public users = [];
  public allUsers = {};
  public followedUsers = new Set;
  private userUID: string;
  public posts: Set<PostViewModel> = new Set
  public firstname: string;
  public lastname: string;
  constructor(
    private store: Store<AppState>,
    private firebaseDatabase: AngularFireDatabase,
    private angularAuth: AngularFireAuth,
    private angularFire: AngularFirestore
  ) { 
    this.store.select(selectAuth).subscribe(data => {
      this.userUID = data.uid; 
      this.firebaseDatabase.database.ref(`/users/${this.userUID}/following`).on('child_added', snapshot => {
         this.followedUsers.add(this.allUsers[snapshot.key]);
       })
      this.firstname = data.firstname
      this.lastname = data.lastname
    })
  }

  ngOnInit() {
    this.firebaseDatabase.database.ref('/users').on('child_added', snapshot => {
      this.users.push({id:snapshot.key, ...snapshot.val()}); 
      this.allUsers[snapshot.key] = snapshot.val();
    })
    
    // this.firebaseDatabase.object('/posts').valueChanges().subscribe(data => {
    //   console.log(data);
    // })

    this.firebaseDatabase.database.ref('/posts').on('child_added', snapshot => {
      let post = {id: snapshot.key, ...snapshot.val()}
      this.posts.add(post); 
      
    })
  
  }
}
