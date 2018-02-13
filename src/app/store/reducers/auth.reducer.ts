import { AuthState, InitialAuthState } from '../state/auth.state';
import * as authActions from '../actions/authentication.actions'
import { CookieService } from 'ngx-cookie';

export function authReducer(state: AuthState = InitialAuthState, action: authActions.Actions): AuthState {
    switch (action.type) {
        case authActions.AuthActions.REGISTER_SUCCESS:
            return { ...state, firstName:action.payload.firstname, lastName: action.payload.lastname, email: action.payload.email, refreshToken: action.payload.refreshToken, uid: action.payload.uid, image: action.payload.image,following: action.payload.following, errors: [] }
        case authActions.AuthActions.REGISTER_FAILED:
            let errMsg = action.payload.message;
            let newErrors = state.errors;
            newErrors.push(errMsg);
            return { ...state, errors: newErrors }
        case authActions.AuthActions.LOGIN_SUCCESS:
            return { ...state,firstName:action.payload.firstName, lastName: action.payload.lastName, email: action.payload.email, refreshToken: action.payload.refreshToken, uid: action.payload.uid, image: action.payload.image, following: action.payload.following, errors:[] }
        case authActions.AuthActions.LOGIN_FAILED:
            let errMsgg = action.payload.message;
            let newErrorsArr = state.errors;
            newErrorsArr.push(errMsgg);
            return { ...state, errors: newErrorsArr }
        case authActions.AuthActions.CLEAR_AUTH_ERRORS:
            let errors = state.errors;
            errors = [];
            return { ...state, errors: errors }   
        case authActions.AuthActions.LOGOUT:
            return InitialAuthState   
        case authActions.AuthActions.UPDATE_FOLLOWED_USERS:
            return {...state, following: action.payload}     
        default:
            return state;
    }
}