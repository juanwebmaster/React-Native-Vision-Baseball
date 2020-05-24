const initialState = {
  username: '',
  email: '',
  displayname: '',
  token: '',
  error: null,
  isLoading: false,
  redirectURL: '/',
};

const userReducer = (state = initialState, action) => {
  let updatedUser = null;
  switch (action.type) {
    case actionTypes.USER_SIGNIN_SUCCESS:
      updatedUser = {
        ...state,
        username: action.userDets.user_nicename,
        email: action.userDets.user_email,
        displayname: action.userDets.user_display_name,
        token: action.token,
      };
      return updatedUser;
    case actionTypes.USER_SIGNIN_FAIL:
      updatedUser = {
        ...state,
        token: '',
        error: action.error,
      };
      return updatedUser;
    case actionTypes.USER_SIGNOUT:
      updatedUser = {
        ...state,
        token: '',
        username: '',
        email: '',
        displayname: '',
        redirectURL: '/',
      };
      return updatedUser;
    default:
      return state;
  }
};

export default userReducer;
