export const userSignout = (token) => {
    return dispatch => {
      axios.post("/simple-jwt-authentication/v1/token/revoke", {}, {headers: {"Authorization": "Bearer " + token}}).then(response => {
        //Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        dispatch({type: actionTypes.USER_SIGNOUT_SUCCESS});
      }).catch(err => {
        dispatch({type: actionTypes.USER_SIGNOUT_FAIL, error: err});
      })
    }
  }