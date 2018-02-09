import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatError } from '@angular/material'
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app-state';
import { RegisterAction, ClearAuthErrors } from '../../../store/actions/authentication.actions'
import { AuthenticationUserModel } from '../../../models/user/registration-user.model';
import { selectAuthErrors } from '../../../store/reducers/index';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public firstname = new FormControl('', [Validators.required]);
  public lastname = new FormControl('', [Validators.required]);  
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public errors: Array<string> = [];

  //password = new FormControl('', [Validators.required, Validators.min(3)])

  constructor(
    private store: Store<AppState>,
    private firebaseDatabase: AngularFireDatabase,

  ) { 
    this.store.select(selectAuthErrors).subscribe(errors => {
      this.errors = errors})
  }

  ngOnInit() {
    this.store.dispatch(new ClearAuthErrors())
  }

  getFirstnameError() {
    return this.firstname.hasError('required') ? 'You must enter a value' : '';
  }

  getLastnameError() {
    return this.lastname.hasError('required') ? 'You must enter a value' : '';
     
  }
  getEmailError() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a value' :
        this.password.value.length < 6 ? 'Password must be at least 6 symbols' :
            '';
  }

  register(){
    let user: AuthenticationUserModel = {firstname: this.firstname.value, lastname:this.lastname.value, email: this.email.value, password: this.password.value}
    this.store.dispatch(new RegisterAction(user))
  }
}
