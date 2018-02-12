import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app-state';
import { selectIsLoggedIn } from '../../../store/reducers/index';
import { AngularFireAuth } from 'angularfire2/auth';
import { LogoutAction } from '../../../store/actions/authentication.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn: boolean

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private store: Store<AppState>,
    private firebaseAuth: AngularFireAuth,

  ) { 
    this.store.select(selectIsLoggedIn).subscribe(data => {
      this.loggedIn = data.email ? true : false
    })
  }

  ngOnInit() {
    // if(this.cookieService.get('email')){
    //   console.log(this.firebaseAuth.auth.currentUser);
    // }
  }

  logout(){
    this.store.dispatch(new LogoutAction)
    this.router.navigateByUrl('login')
  }
}
