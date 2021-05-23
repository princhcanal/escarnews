import { AuthActionTypes, LOGIN, LOGOUT } from './types';

export const login = (): AuthActionTypes => {
  return {
    type: LOGIN,
  };
};

export const logout = (): AuthActionTypes => {
  return {
    type: LOGOUT,
  };
};
