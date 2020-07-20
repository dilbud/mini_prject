export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';

import alert from '../../screens/AlertScreen';
import { navigate } from '../../ExternalRootNavigation';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signup = (email, password, name) => {
  return (dispatch, getState) => {
    let unsubscribe = () => {};
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((val) => {
        unsubscribe = auth().onAuthStateChanged((user) => {
          if (user)
            user
              .updateProfile({ displayName: name })
              .then(() => {
                user
                  .sendEmailVerification()
                  .then(() => {
                    firestore()
                      .collection('users')
                      .doc(user.uid)
                      .set({
                        name,
                        email,
                        rooms: [],
                      })
                      .then((v) => {
                        alert('Account Created', 'Please verify Email');
                      })
                      .catch((dbError) => {
                        alert('please Try again', 'Check your connection');
                      });
                  })
                  .catch((eVError) => {
                    alert('please Try again', 'Check your connection');
                  });
              })
              .catch((uPError) => {
                alert('please Try again', 'Check your connection');
              });
        });
        dispatch({
          type: SIGN_UP,
          payload: {},
        });
      })
      .catch((uCError) => {
        alert('please Try again', 'Check your connection');
      })
      .finally(() => {
        unsubscribe();
      });
  };
};

export const signin = (email, password) => {
  return (dispatch, getState) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((val) => {
        if (val.user.emailVerified) {
          dispatch({
            type: SIGN_IN,
            payload: {
              token: val.user.uid,
            },
          });
        } else {
          alert('Email Verification', 'Please Verify Your Email');
        }
      })
      .catch((error) => {
        alert('login', 'User Not Found');
      });
  };
};

export const autologin = (userToken) => {
  return (dispatch, getState) => {
    dispatch({ type: 'RESTORE_TOKEN', payload: userToken });
  };
};

export const signout = () => {
  return (dispatch, getState) => {
    auth()
      .signOut()
      .then((val) => {})
      .catch((error) => {});
    dispatch({
      type: SIGN_OUT,
    });
  };
};
