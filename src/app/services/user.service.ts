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
import { selectAuth } from '../store/reducers/index';


@Injectable()
export class UserService {

  private user;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase,
    private angularFire: AngularFirestore,
    private store: Store<AppState>
  ) {
    this.store.select(selectAuth).subscribe(data => {
        this.user = data
    })
  }

  editUser(user) {
    return Observable.fromPromise(this.firebaseDatabase.object(`/users/${this.user.uid}`).update(user))
  }

}
