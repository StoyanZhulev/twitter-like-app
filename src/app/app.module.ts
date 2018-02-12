import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastModule } from "ng2-toastr/ng2-toastr"

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { CookieModule, CookieService } from 'ngx-cookie';
import { HttpClientModule } from '@angular/common/http'

import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './store/effects/auth.effects';
import { RegisterComponent } from './components/auth/register/register.component';

import { MatFormFieldModule, MatCardModule, MatCheckboxModule, MatIconModule, MatExpansionModule } from '@angular/material'
import { MatInputModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

import { appRoutes } from './app.routes'

import { MDBBootstrapModule }  from './typescripts/free'

import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/common/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserCardComponent } from './components/user/user-card/user-card.component';
import { SidenavComponent } from './components/common/sidenav/sidenav.component';
import { CreateComponent } from './components/posts/create/create.component'
import { PostService } from './services/post.service';
import { PostCardComponent } from './components/posts/post-card/post-card.component';
import { ProfilePageComponent } from './components/users/profile-page/profile-page.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { ToastrService } from './services/toastr.service';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserService } from './services/user.service';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UserCardComponent,
    SidenavComponent,
    CreateComponent,
    PostCardComponent,
    ProfilePageComponent,
    CreatePostComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MDBBootstrapModule.forRoot(),
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CookieModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthenticationEffects
    ])
  ],
  providers: [
    AuthService,
    CookieService,
    PostService,
    ToastrService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
