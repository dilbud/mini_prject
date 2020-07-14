export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN = 'SIGN_IN';

import { AsyncStorage } from 'react-native';

export const signup = (email, password) => {
  return {
    type: SIGNUP,
    payload: {},
  };
};

export const signin = (email, password) => {
  return (dispatch, getState) => {
    // async action
    dispatch({
      type: SIGN_IN,
      payload: {
        token: 'token',
      },
    });
  };
};

export const signout = () => {
  return (dispatch, getState) => {
    AsyncStorage.removeItem('CAP_101')
      .then((val) => {
        dispatch({
          type: SIGN_OUT,
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_OUT,
        });
      });
  };
};
