export interface AuthState {
    firstname: string,
    lastname: string,
    email: string,
    refreshToken: string,
    uid: string,
    errors: Array<string>
  }

export const InitialAuthState: AuthState = {
    firstname: '',
    lastname: '',
    email: '',
    refreshToken: '',
    uid: '',
    errors: []
}