import clone from "clone";

import {
  EDIT_USER,
  SET_USER,
  SET_USER_ROLES,
  LOGOUT,
  LOGIN_CHECK_DATA,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SET_TOKEN_PROMISE
} from "../actions/login_action";

const user_empty = {
  username: "",
  password: "",
  invalid_user_name: "",
  invalid_password: "",
  roles: []
};

const initial_state = {
  user: user_empty,
  status_text: ""
};

export default function handleLogin(state = clone(initial_state), action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: { ...user_empty, ...action.user }
      };
    case SET_USER_ROLES:
      return {
        ...state,
        roles: action.roles
      };
    case EDIT_USER:
      return {
        ...state,
        user: action.user
      };
    case LOGIN_CHECK_DATA:
      return {
        ...state,
        user: action.user
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        completed: 40,
        isFetching: true,
        status_text: "",
        isAuthenticated: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        completed: 100,
        isFetching: false,
        isAuthenticated: true
      };
    case LOGIN_SET_TOKEN_PROMISE:
      return {
        ...state,
        freshTokenPromise: action.freshTokenPromise
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        status_text: action.status_text,
        isFetching: false,
        completed: 0
      };
    case LOGOUT:
      return clone(initial_state);
    default:
      return state;
  }
}
