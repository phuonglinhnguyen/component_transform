import axios from "axios";
import querystring from "querystring";
import jwtDecode from "jwt-decode";
import { setToken, removeToken } from "../../../utils/auth";
import { API_ENDPOINT, PATHNAME_HOME } from "../../../constants";
import { default_home_page } from "../../../constants/config_roles";

export const SET_USER = "SET_USER";
export const EDIT_USER = "EDIT_USER";
export const SET_USER_ROLES = "SET_USER_ROLES";

export const LOGIN_CHECK_DATA = "LOGIN_CHECK_DATA";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SET_TOKEN_PROMISE = "LOGIN_SET_TOKEN_PROMISE";

export const LOGOUT = "LOGOUT";

export const editUser = e => (dispatch, getState) => {
  if (!e.target) {
    return;
  }

  const user = { ...getState().current_user.user };
  const _value = e.target.value || null;

  user[e.target.name] = _value;

  return dispatch({
    type: EDIT_USER,
    user
  });
};

export const setUser = (user, history) => dispatch => {
  user.username = user.username.toLowerCase();
  setTimeout(() => {
    if (history && history.location.pathname === "/") {
      var path = getDefaultHomePage(user.roles);
      history.push(path);
    }
  });
  return dispatch({
    type: SET_USER,
    user
  });
};

export const loginSuccess = user => async dispatch => {
  user.username = user.username.toLowerCase();
  dispatch({
    type: LOGIN_SUCCESS,
    user
  });
  return dispatch(setUser(user));
};

export function loginFailure(status_text) {
  return {
    type: LOGIN_FAILURE,
    status_text: status_text
  };
}

export const logout = user => (dispatch, getState) => {
  removeToken();
  return dispatch({
    type: LOGOUT
  });
};

export const doLogin = (history, callback_error) => (dispatch, getState) => {
  const { user: user_, isFetching } = getState().current_user;
  if (isFetching) {
    return;
  }
  const user = { ...user_ };

  if (!user.username || !user.password) {
    user.invalid_user_name = !user.username ? "This field is required." : "";
    user.invalid_password = !user.password ? "This field is required." : "";

    dispatch({
      type: LOGIN_CHECK_DATA,
      user
    });
    return;
  }

  dispatch({
    type: LOGIN_REQUEST
  });

  var instance = axios.create({
    baseURL: API_ENDPOINT
  });

  return instance
    .post(
      "authentication/tokens",
      querystring.stringify({
        username: user.username.toLowerCase(),
        password: user.password
      })
    )
    .then(res => {
      try {
        const data = res.data;
        const responseData = jwtDecode(data.token);
        setToken(data.token, data.refreshToken,dispatch);

        setTimeout(() => {
          var path = getDefaultHomePage(responseData.roles);

          history.push(path);
        }, 0);

        return dispatch(loginSuccess(responseData));
      } catch (error) {
        throw new Error(error);
      }
    })
    .catch(function(error) {
      let status_text = "";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        status_text = error.response.data.message;
        if(!status_text&&error.response.status==500){
          status_text='Hệ thống đang quá tải';
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config); 
      setTimeout(() => {
        callback_error();
      }, 0);

      return dispatch(loginFailure(status_text));
    });
};

export function handleLogout() {
  return dispatch => dispatch(logout());
}

function getDefaultHomePage(userRoles) {
  var result = null;
  if (userRoles && userRoles.length > 0) {
    for (var role of userRoles) {
      if (
        default_home_page[role] &&
        (result === null || default_home_page[role].priority < result.priority)
      ) {
        result = default_home_page[role];
      }
    }
  }
  return result ? result.path : PATHNAME_HOME;
}
