import {
  RESTORE_TOKEN,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
} from '../actions/AuthAction';

const initialState = {
  userToken: null,
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case SIGN_UP:
      return {
        ...state,
        isLoading: false,
        userToken: action.payload.token,
      };
    case SIGN_IN:
      return {
        ...state,
        isLoading: false,
        userToken: action.payload.token,
      };
    case SIGN_OUT:
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
};
