import { RESTORE_TOKEN, SIGN_OUT, SIGN_IN } from '../actions/AuthAction';

const initialState = {
  userToken: null,
  isLoading: true,
  isSignout: true,
  isSigup: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...state,
        isLoading: false,
        isSignout: false,
        userToken: action.payload.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        userToken: null,
        isLoading: false,
        isSignout: true,
        isSigup: false,
      };
    default:
      return state;
  }
};
