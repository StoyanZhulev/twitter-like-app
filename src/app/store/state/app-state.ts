import { AuthState, InitialAuthState } from './auth.state'

export interface AppState {
    auth: AuthState
    errors: Array<string>
}

export const InitialApptate: AppState = {
    auth: InitialAuthState,
    errors: []
}