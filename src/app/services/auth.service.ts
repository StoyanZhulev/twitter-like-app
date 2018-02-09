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


@Injectable()
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase,
    private angularFire: AngularFirestore,
    private store: Store<AppState>
  ) {

  }


  register(user: AuthenticationUserModel) {
    return Observable.fromPromise(this.firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password))
      // .then((user) => {
      //   console.log('WTFFFFF')
      // })
      // .catch(error => {
      //   console.log(error)
      //   throw error
      // });
  }


  registerAuth(user) {
    return Observable.fromPromise(this.firebaseDatabase.object(`/users/${user.uid}`).update({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      following: []
    }))
      // .then((user) => {
      //   console.log('WTFFFFF')
      // })
      // .catch(error => {
      //   console.log(error)
      //   throw error
      // });
  }


  loginAuth(userData){
    console.log(userData)
    return this.firebaseDatabase.object('/users/' + userData.uid).valueChanges()
  }

  logout(){
    //this.angularFire.collection('/users', ref => ref.where('user', '==', 'user'))
    return Observable.fromPromise(this.firebaseAuth.auth.signOut())
  }

  login(user: AuthenticationUserModel){
    return Observable.fromPromise(this.firebaseAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email, user.password))
  }

}
