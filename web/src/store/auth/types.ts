export interface AuthState {
  isLoggedIn: boolean;
  userId: string;
  email: string;
  username: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface LoginAction {
  type: typeof LOGIN;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;
