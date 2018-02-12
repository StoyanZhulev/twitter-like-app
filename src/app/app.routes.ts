import { Routes } from "@angular/router";
import { RegisterComponent } from "./components/auth/register/register.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfilePageComponent } from "./components/users/profile-page/profile-page.component";


export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent },

  { path: 'users/:id', component: ProfilePageComponent }

  // {path: '**', component: NotFoundComponent}
]
