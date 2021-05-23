import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import {
  AuthState,
  AuthActionTypes,
  LoginAction,
  LogoutAction,
  LOGIN,
  LOGOUT,
  TokenPayload,
} from './types';

const initialState: AuthState = {
  isLoggedIn: false,
  username: '',
  email: '',
  userId: '',
};

const login = (state: AuthState, action: LoginAction): AuthState => {
  const token = Cookies.get('Authorization');

  if (!token) return initialState;

  const payload = jwtDecode<TokenPayload>(token);
  const { username, email, userId } = payload;

  return {
    isLoggedIn: true,
    username,
    email,
    userId,
  };
};

const logout = (state: AuthState, action: LogoutAction): AuthState => {
  return initialState;
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN:
      return login(state, action);
    case LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};
