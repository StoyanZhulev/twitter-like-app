import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { Action, Store } from '@ngrx/store'
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/do'
import { AppState } from '../state/app-state';
import * as authActions from '../actions/authentication.actions';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from '../../services/toastr.service';

@Injectable()

export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  @Effect() register$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActions.REGISTER)
    .switchMap((action: authActions.RegisterAction) =>
      this.authService.register(action.payload)
        .map(data => {
          let userData = {
            firstName: action.payload.firstname,
            lastName: action.payload.lastname,
            email: data.user.email,
            refreshToken: data.user.refreshToken,
            uid: data.user.uid
          }
          this.cookieService.put('email', userData.email);

          return new authActions.RegisterAuthAction(userData);
        })
        .catch(err => {
          console.log('SHIIIIIT')
          return of(new authActions.RegisterFailedAction(err))
        }))

  @Effect() registerAuth$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActions.REGISTER_AUTH)
    .switchMap((action: authActions.RegisterAuthAction) =>
      this.authService.registerAuth(action.payload)
        .map(data => {
          this.toastr.showSuccess('Registered', 'You have successfully registered!')          
          this.router.navigateByUrl('home');
          return new authActions.RegisterSuccessAction(action.payload);
        })
        .catch(err => {
          console.log('SHIIIIIT')
          return of(new authActions.RegisterFailedAction(err))
        }))

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActions.LOGIN)
    .switchMap((action: authActions.LoginAction) =>
      this.authService.login(action.payload)
        .map(data => {
          let userData = {
            email: data.user.email,
            refreshToken: data.user.refreshToken,
            uid: data.user.uid
          }
          this.cookieService.put('email', userData.email);
          this.router.navigateByUrl('home')
          return new authActions.LoginAuthAction(userData);
        })
        .catch(err => {
          console.log('SHIIIIIT')
          return of(new authActions.LoginActionFailed(err))
        }))

  @Effect() loginAuth$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActions.LOGIN_AUTH)
    .switchMap((action: authActions.LoginAuthAction) =>
      this.authService.loginAuth(action.payload)
        .map(data => {
          let userData = {...action.payload, ...data}
          this.toastr.showSuccess('Logged in!', 'You have successfully logged in!')          
          this.router.navigateByUrl('home')
          return new authActions.LoginActionSuccess(userData);
        })
        .catch(err => {
          console.log('SHIIIIIT')
          return of(new authActions.LoginActionFailed(err))
        }))
}
