import { Action } from '@ngrx/store'
import { AuthenticationUserModel } from '../../models/user/registration-user.model'

export const AuthActions = {
    REGISTER: 'REGISTER',
    REGISTER_AUTH: 'REGISTER_AUTH',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILED: 'REGISTER_FAILED',
    LOGIN: 'LOGIN',
    LOGIN_AUTH: 'LOGIN_AUTH',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT: 'LOGOUT',
    CLEAR_AUTH_ERRORS: 'CLEAR_AUTH_ERRORS'
}


export class RegisterAction implements Action {
    type: string = AuthActions.REGISTER

    constructor(public payload: AuthenticationUserModel) {
    }
}

export class RegisterAuthAction implements Action {
    type: string = AuthActions.REGISTER_AUTH

   constructor(public payload: any) {
   }
}


export class RegisterSuccessAction implements Action {
     type: string = AuthActions.REGISTER_SUCCESS

    constructor(public payload: any) {
    }
}

export class RegisterFailedAction implements Action {
    type: string = AuthActions.REGISTER_FAILED

    constructor(public payload: any) {
    }
}

export class LoginAction implements Action {
    type: string = AuthActions.LOGIN

    constructor(public payload: any){
    }
}

export class LoginAuthAction implements Action {
    type: string = AuthActions.LOGIN_AUTH

    constructor(public payload: any){
    }
}

export class LoginActionSuccess implements Action {
    type: string = AuthActions.LOGIN_SUCCESS

    constructor(public payload: any){
    }
}

export class LoginActionFailed implements Action {
    type: string = AuthActions.LOGIN_FAILED

    constructor(public payload: any){
    }
}

export class LogoutAction implements Action{
    type: string = AuthActions.LOGOUT

    constructor(public payload: any = ''){
    }
}

export class ClearAuthErrors implements Action {
    type: string = AuthActions.CLEAR_AUTH_ERRORS

    constructor(public payload: any = ''){
    }
}


export type Actions = 
    RegisterAction | 
    RegisterAuthAction |
    RegisterSuccessAction |
    RegisterFailedAction |
    LoginAction |
    LoginAuthAction |
    LoginActionSuccess |
    LoginActionFailed |
    ClearAuthErrors |
    LogoutAction