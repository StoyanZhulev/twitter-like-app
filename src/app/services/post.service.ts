import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthenticationUserModel } from '../models/user/registration-user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase }   from 'angularfire2/database'
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app-state';
import * as authActions from '../store/actions/authentication.actions';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { PostModel } from '../models/post/post.model';


@Injectable()
export class PostService {

  constructor(
    private firebaseDatabase: AngularFireDatabase,
    private angularFire: AngularFirestore,
    private store: Store<AppState>
  ) {

  }





  createPost(post: PostModel){
    let id = this.angularFire.createId()
    console.log(post)
    return Observable.fromPromise(this.firebaseDatabase.object(`/posts/${id}`).update(post))
  }

  likePost(post){
    return Observable.fromPromise(this.firebaseDatabase.object(`/posts/${post.id}`).update(post))    
  }

  dislikePost(post){
    return Observable.fromPromise(this.firebaseDatabase.object(`/posts/${post.id}`).update(post))    
    
  }
  
}
