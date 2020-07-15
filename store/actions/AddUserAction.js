export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN = 'SIGN_IN';

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
    dispatch({
      type: SIGN_OUT,
    });
  };
};
