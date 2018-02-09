import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app-state';
import { AuthenticationUserModel } from '../../../models/user/registration-user.model';
import { LoginAction, ClearAuthErrors } from '../../../store/actions/authentication.actions';
import { selectAuthErrors } from '../../../store/reducers/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public errors: Array<string> = [];
  //password = new FormControl('', [Validators.required, Validators.min(3)])

  constructor(
    private store: Store<AppState>
  ) { 
    this.store.select(selectAuthErrors).subscribe(errors => {
      this.errors = errors})
  }

  ngOnInit() {
    
      this.store.dispatch(new ClearAuthErrors())

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

  login(){
    let user: AuthenticationUserModel = {firstname: '', lastname:'',email: this.email.value, password: this.password.value}
    this.store.dispatch(new LoginAction(user))
  }
}
