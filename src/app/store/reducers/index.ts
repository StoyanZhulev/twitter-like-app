import { createSelector, ActionReducerMap } from "@ngrx/store"

import { authReducer } from './auth.reducer'
import { AppState } from "../state/app-state";
import { AuthState } from "../state/auth.state";

export const reducers = {
    auth: authReducer,
  }

export const selectAuth = (state: AppState) => state.auth;
export const selectIsLoggedIn = createSelector(selectAuth, (state: AuthState) => state)
export const selectAuthErrors = createSelector(selectAuth, (state: AuthState) => state.errors)