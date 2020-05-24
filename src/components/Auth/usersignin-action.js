export const userSignin = (user) => {
    return dispatch => {
      axios.post("/simple-jwt-authentication/v1/token", user)
        .then(response => {
          let userDets = {
            username: response.data.user_nicename,
            email: response.data.user_email,
            displayname:  response.data.user_display_name
          };
          //Set token and email in local storage in case Redux data is lost such as on reload
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.user_email);
          dispatch({type: "USER_SIGNIN_SUCCESS", userDets: userDets, token: response.data.token});
        }).catch(err => {
          dispatch({type: "USER_SIGNIN_FAIL", error: err});
        });
    }
  };