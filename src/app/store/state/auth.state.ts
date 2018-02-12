export interface AuthState {
    firstName: string,
    lastName: string,
    email: string,
    refreshToken: string,
    uid: string,
    image: string,
    errors: Array<string>
  }

export const InitialAuthState: AuthState = {
    firstName: '',
    lastName: '',
    email: '',
    refreshToken: '',
    uid: '',
    image: '',
    errors: []
}