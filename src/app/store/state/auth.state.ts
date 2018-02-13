export interface AuthState {
    firstName: string,
    lastName: string,
    email: string,
    refreshToken: string,
    uid: string,
    image: string,
    following: Object,
    errors: Array<string>
  }

export const InitialAuthState: AuthState = {
    firstName: '',
    lastName: '',
    email: '',
    refreshToken: '',
    uid: '',
    image: '',
    following: {},
    errors: []
}